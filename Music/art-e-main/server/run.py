from app import create_app
from flask_cors import CORS

# Create the Flask app instance
app = create_app()

# Configure CORS to allow requests from the frontend domain
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
