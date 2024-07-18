# Image-to-JSON Web App

This web application allows you to upload images of questions from your books. The app processes these images, extracts text, and converts the extracted text into JSON format for easy handling and analysis.

## Features

- Upload images via a web interface.
- Convert images to JSON format using optical character recognition (OCR).
- View and manage JSON data extracted from images.

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Create a Virtual Environment**

   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**

   - On Windows:

     ```bash
     venv\Scripts\activate
     ```

   - On macOS/Linux:

     ```bash
     source venv/bin/activate
     ```

4. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Application**

   ```bash
   gunicorn app:app --bind 0.0.0.0:10000
   ```

   The app will be accessible at `http://localhost:10000` on your local machine.

## Deployment

The app is deployed on Render. You can access it via the provided link.

## Upload Images

To upload images, use the following link:

[Upload Images](https://dhruwayush.github.io/Planetable/upload.html)

## Troubleshooting

For common deployment issues and solutions, visit the Render troubleshooting guide: [Render Troubleshooting Guide](https://docs.render.com/troubleshooting-deploys).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Flask
- Gunicorn
- Tesseract OCR
- Werkzeug
- Render
```

Make sure to replace `your-username` and `your-repository` with the appropriate GitHub username and repository name. Adjust any details to fit your project specifics if needed.
