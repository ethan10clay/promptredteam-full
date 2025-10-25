# backend/app/attacks/zero_width.py
from .base import BaseAttack, AttackResult
from typing import Optional

class ZeroWidthAttack(BaseAttack):
    """Detects hidden messages in zero-width Unicode characters"""
    
    ZERO_WIDTH_CHARS = ['\u200b', '\u200c', '\u200d', '\ufeff']
    
    def __init__(self):
        super().__init__()
        self.description = "Detects messages hidden in zero-width Unicode characters (ZWJ, ZWNJ, ZWSP)"
        self.severity_base = 0.8
    
    def detect(self, text: str) -> AttackResult:
        """Detect and decode zero-width character injection"""
        
        # Extract zero-width characters
        hidden_chars = ''.join(c for c in text if c in self.ZERO_WIDTH_CHARS)
        
        if not hidden_chars:
            return AttackResult(
                attack_name="Zero-Width Injection",
                attack_type="encoding",
                detected=False,
                severity=0.0,
                confidence=1.0,
                description="No zero-width characters detected"
            )
        
        # Try to decode
        decoded_message = self._decode_binary(hidden_chars)
        
        severity = self._calculate_severity(len(hidden_chars), decoded_message)
        
        return AttackResult(
            attack_name="Zero-Width Injection",
            attack_type="encoding",
            detected=True,
            severity=severity,
            confidence=0.95 if decoded_message else 0.7,
            description=f"Found {len(hidden_chars)} zero-width characters",
            evidence=decoded_message if decoded_message else hidden_chars[:50],
            mitigation="Remove or escape zero-width Unicode characters before processing",
            reference_url="https://github.com/your-repo/docs/zero-width-injection"
        )
    
    def _decode_binary(self, zero_width_chars: str) -> Optional[str]:
        """Decode zero-width chars as binary encoding"""
        binary = ''
        for char in zero_width_chars:
            if char == '\u200d':
                binary += '1'
            elif char == '\u200c':
                binary += '0'
        
        if not binary:
            return None
        
        # Decode to bytes
        decoded_bytes = bytearray()
        for i in range(0, len(binary), 8):
            byte = binary[i:i+8]
            if len(byte) == 8:
                decoded_bytes.append(int(byte, 2))
        
        # Try UTF-16 BE (emoji-crypt standard)
        try:
            decoded = decoded_bytes.decode('utf-16-be', errors='strict')
            return decoded.strip()
        except:
            pass
        
        # Try UTF-16 LE
        try:
            decoded = decoded_bytes.decode('utf-16-le', errors='strict')
            return decoded.strip()
        except:
            pass
        
        return None
    
    def _calculate_severity(self, char_count: int, decoded: Optional[str]) -> float:
        """Calculate severity based on findings"""
        base = 0.5
        
        # More characters = more suspicious
        if char_count > 100:
            base += 0.2
        if char_count > 500:
            base += 0.2
        
        # Successfully decoded = definitely malicious
        if decoded:
            base += 0.3
        
        return min(base, 1.0)
    
    def generate_payload(self, instruction: str) -> str:
        """Generate a zero-width encoded payload"""
        # Convert instruction to UTF-16 BE bytes
        instruction_bytes = instruction.encode('utf-16-be')
        
        # Convert to binary
        binary = ''.join(format(byte, '08b') for byte in instruction_bytes)
        
        # Convert to zero-width chars
        payload = ''.join('\u200d' if bit == '1' else '\u200c' for bit in binary)
        
        # Add a visible emoji as carrier
        return f"😀{payload}"
    
    def get_category(self) -> str:
        return "encoding"