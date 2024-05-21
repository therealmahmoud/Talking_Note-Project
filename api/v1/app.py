from flask import Flask
from .view import app_views


app = Flask(__name__)
app.register_blueprint(app_views)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6000, threaded=True)
