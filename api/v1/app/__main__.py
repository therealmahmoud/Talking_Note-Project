# Talking_Note-Project/api/v1/app/__main__.py
from . import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=6000)
