from flask import Flask, request, jsonify
from flask_cors import CORS
import argostranslate.package
import argostranslate.translate

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST', 'GET']) # Vercel handles routing, so use root path
def handle_translation():
    if request.method == 'POST':
        data = request.get_json()
        text_to_translate = data.get('text', '')
        from_lang = data.get('from', 'en')
        to_lang = data.get('to', 'de')

        translated_text = argostranslate.translate.translate(text_to_translate, from_lang, to_lang)

        return jsonify({'translated_text': translated_text})

    # A simple response for GET requests to check if the API is up
    return "Translation API is running."