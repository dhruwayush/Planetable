from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    text = extract_text_from_image(file_path)
    questions = extract_questions(text)

    os.remove(file_path)

    return jsonify({'questions': questions})

def extract_text_from_image(image_path):
    text = pytesseract.image_to_string(Image.open(image_path))
    return text

def extract_questions(text):
    lines = text.split('\n')
    questions = [line for line in lines if '?' in line]
    return questions

if __name__ == '__main__':
    app.run(debug=True)
