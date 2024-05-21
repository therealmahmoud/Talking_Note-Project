from flask import current_app as app, jsonify
from . import app_views

@app_views.route('/', methods=['GET'], strict_slashes=False)
def hello():
    return ("Hello World")

@app_views.route('/test', methods=['GET'], strict_slashes=False)
def test():
    return ("hello from test")


