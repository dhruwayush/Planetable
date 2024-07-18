import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image

app = Flask(__name__)
CORS(app)

# Ensure uploads directory exists
uploads_dir = 'uploads'
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)

@app.route('/')
def index():
    return "Welcome to the OCR API! Use /upload to upload images."

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        file_path = os.path.join(uploads_dir, file.filename)
        file.save(file_path)

        text = extract_text_from_image(file_path)
        questions = extract_questions(text)

        os.remove(file_path)

        return jsonify({'questions': questions})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def extract_text_from_image(image_path):
    try:
        text = pytesseract.image_to_string(Image.open(image_path))
        return text
    except Exception as e:
        return str(e)

def extract_questions(text):
    lines = text.split('\n')
    questions = [line for line in lines if '?' in line]
    return questions

if __name__ == '__main__':
    app.run(debug=True)
