import requests

def translate_text(text, target_language, source_language="en"):
    url = f"https://api.mymemory.translated.net/get?q={text}&langpair={source_language}|{target_language}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()["responseData"]["translatedText"]
    else:
        print(f"Error: Received status code {response.status_code}")
        return None

translated_text = translate_text("Hello, world!", "es")
print(translated_text)
