""" The init file if the api."""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from . import *









""" from flask import Flask

def create_app():
    app = Flask(__name__)

    with app.app_context():
        from . import routes
        return app """
