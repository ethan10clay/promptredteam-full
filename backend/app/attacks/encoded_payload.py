# backend/app/attacks/encoded_payload.py
from .base import BaseAttack, AttackResult
import re
import base64

class EncodedPayloadAttack(BaseAttack):
    """Detects encoded or obfuscated payloads"""
    
    def __init__(self):
        super().__init__()
        self.description = "Detects base64, hex, or other encoded payloads that may hide malicious content"
        self.severity_base = 0.7
    
    def detect(self, text: str) -> AttackResult:
        """Detect encoded payloads"""
        findings = []
        
        # Check for Base64
        base64_matches = self._detect_base64(text)
        if base64_matches:
            findings.append(f"Base64: {len(base64_matches)} instance(s)")
        
        # Check for Hex encoding
        hex_matches = self._detect_hex(text)
        if hex_matches:
            findings.append(f"Hex: {len(hex_matches)} instance(s)")
        
        # Check for URL encoding
        url_matches = self._detect_url_encoding(text)
        if url_matches:
            findings.append(f"URL encoded: {len(url_matches)} instance(s)")
        
        # Check for Unicode escapes
        unicode_matches = self._detect_unicode_escapes(text)
        if unicode_matches:
            findings.append(f"Unicode escapes: {len(unicode_matches)} instance(s)")
        
        if not findings:
            return AttackResult(
                attack_name="Encoded Payload",
                attack_type="obfuscation",
                detected=False,
                severity=0.0,
                confidence=1.0,
                description="No encoded payloads detected"
            )
        
        # Calculate severity based on number and type of encodings
        severity = 0.4 + (len(findings) * 0.15)
        
        # Try to decode and check for suspicious content
        decoded_content = self._try_decode(text, base64_matches)
        if decoded_content and self._is_suspicious_decoded(decoded_content):
            severity += 0.2
            findings.append(f"Suspicious decoded content detected")
        
        return AttackResult(
            attack_name="Encoded Payload",
            attack_type="obfuscation",
            detected=True,
            severity=min(severity, 1.0),
            confidence=0.8,
            description=f"Detected encoded content: {', '.join(findings)}",
            evidence="; ".join(findings),
            mitigation="Decode and scan encoded content, limit encoded input length, validate decoded content",
            reference_url="https://github.com/your-repo/docs/encoded-payload"
        )
    
    def _detect_base64(self, text: str) -> list:
        """Detect Base64 encoded strings"""
        # Look for base64-like strings (length > 20, valid base64 chars)
        pattern = r'[A-Za-z0-9+/]{20,}={0,2}'
        matches = re.findall(pattern, text)
        
        # Validate they're actually base64
        valid_matches = []
        for match in matches:
            try:
                # Try to decode to verify it's valid base64
                base64.b64decode(match, validate=True)
                valid_matches.append(match)
            except:
                pass
        
        return valid_matches
    
    def _detect_hex(self, text: str) -> list:
        """Detect hex encoded strings"""
        # Look for hex strings (0x prefix or long hex sequences)
        patterns = [
            r'0x[0-9a-fA-F]{8,}',
            r'\\x[0-9a-fA-F]{2}',
            r'[0-9a-fA-F]{32,}'  # Long hex without prefix
        ]
        
        matches = []
        for pattern in patterns:
            matches.extend(re.findall(pattern, text))
        
        return matches
    
    def _detect_url_encoding(self, text: str) -> list:
        """Detect URL encoded strings"""
        pattern = r'%[0-9a-fA-F]{2}'
        matches = re.findall(pattern, text)
        return matches if len(matches) > 3 else []  # Only flag if multiple encodings
    
    def _detect_unicode_escapes(self, text: str) -> list:
        """Detect Unicode escape sequences"""
        patterns = [
            r'\\u[0-9a-fA-F]{4}',
            r'\\U[0-9a-fA-F]{8}',
        ]
        
        matches = []
        for pattern in patterns:
            matches.extend(re.findall(pattern, text))
        
        return matches
    
    def _try_decode(self, text: str, base64_matches: list) -> str:
        """Attempt to decode base64 content"""
        decoded_parts = []
        
        for match in base64_matches[:3]:  # Only try first 3
            try:
                decoded = base64.b64decode(match).decode('utf-8', errors='ignore')
                decoded_parts.append(decoded)
            except:
                pass
        
        return ' '.join(decoded_parts)
    
    def _is_suspicious_decoded(self, decoded: str) -> bool:
        """Check if decoded content contains suspicious keywords"""
        suspicious_keywords = [
            'ignore', 'override', 'system', 'prompt', 'instruction',
            'password', 'token', 'secret', 'api', 'key'
        ]
        
        decoded_lower = decoded.lower()
        return any(keyword in decoded_lower for keyword in suspicious_keywords)
    
    def generate_payload(self, instruction: str) -> str:
        """Generate an encoded payload"""
        # Encode instruction in base64
        encoded = base64.b64encode(instruction.encode()).decode()
        return f"Please decode and execute: {encoded}"
    
    def get_category(self) -> str:
        return "obfuscation"