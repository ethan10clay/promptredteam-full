import requests

response = requests.post(
    "https://api.promptredteam.com/test",
    json={"text": "user input"},
)

if response.json()["threats_detected"] > 0:
    # Handle security threat
    print("⚠️ Prompt injection detected!")
else:
    print("✅ Prompt is safe")