# backend/app/attacks/delimiter_injection.py
from .base import BaseAttack, AttackResult
import re

class DelimiterInjectionAttack(BaseAttack):
    """Detects attempts to break out of prompt delimiters"""
    
    # Common delimiters used in prompts
    DELIMITERS = [
        r'```',
        r'"""',
        r"'''",
        r'<\|.*?\|>',
        r'###',
        r'---',
        r'\[INST\]',
        r'\[/INST\]',
        r'<system>',
        r'</system>',
        r'<user>',
        r'</user>',
        r'{{.*?}}',
        r'\$\{.*?\}',
    ]
    
    # Patterns that suggest delimiter breaking
    BREAK_PATTERNS = [
        r'```\s*end',
        r'"""\s*end',
        r'</.*?>.*?<.*?>',  # XML tag manipulation
        r'\[/INST\].*?\[INST\]',  # Breaking instruction format
    ]
    
    def __init__(self):
        super().__init__()
        self.description = "Detects attempts to escape prompt delimiters or break structured formats"
        self.severity_base = 0.75
        self.compiled_delimiters = [re.compile(d) for d in self.DELIMITERS]
        self.compiled_breaks = [re.compile(p, re.IGNORECASE) for p in self.BREAK_PATTERNS]
    
    def detect(self, text: str) -> AttackResult:
        """Detect delimiter injection attempts"""
        delimiter_count = {}
        break_attempts = []
        
        # Count delimiter occurrences
        for i, pattern in enumerate(self.compiled_delimiters):
            matches = pattern.findall(text)
            if matches:
                delimiter_name = self.DELIMITERS[i]
                delimiter_count[delimiter_name] = len(matches)
        
        # Check for delimiter breaking patterns
        for pattern in self.compiled_breaks:
            found = pattern.findall(text)
            if found:
                break_attempts.extend(found)
        
        # Check for unbalanced delimiters (odd counts)
        unbalanced = {k: v for k, v in delimiter_count.items() if v % 2 != 0}
        
        # Detect if suspicious
        is_suspicious = bool(break_attempts) or bool(unbalanced) or len(delimiter_count) > 3
        
        if not is_suspicious:
            return AttackResult(
                attack_name="Delimiter Injection",
                attack_type="escape_sequence",
                detected=False,
                severity=0.0,
                confidence=1.0,
                description="No delimiter manipulation detected"
            )
        
        # Calculate severity
        severity = 0.5
        if break_attempts:
            severity += 0.3
        if unbalanced:
            severity += 0.15
        if len(delimiter_count) > 3:
            severity += 0.05
        
        evidence_parts = []
        if break_attempts:
            evidence_parts.append(f"Break attempts: {len(break_attempts)}")
        if unbalanced:
            evidence_parts.append(f"Unbalanced delimiters: {list(unbalanced.keys())}")
        if delimiter_count:
            evidence_parts.append(f"Total delimiters: {sum(delimiter_count.values())}")
        
        return AttackResult(
            attack_name="Delimiter Injection",
            attack_type="escape_sequence",
            detected=True,
            severity=min(severity, 1.0),
            confidence=0.75,
            description="Detected potential delimiter manipulation",
            evidence="; ".join(evidence_parts),
            mitigation="Use consistent delimiter syntax, validate delimiter balance, escape user input",
            reference_url="https://github.com/your-repo/docs/delimiter-injection"
        )
    
    def generate_payload(self, instruction: str) -> str:
        """Generate a delimiter injection payload"""
        return f'``` end previous context\n```\n{instruction}'
    
    def get_category(self) -> str:
        return "injection"