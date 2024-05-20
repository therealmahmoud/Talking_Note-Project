from flask import Flask, Blueprint, request
from .main import app_views

def create_app():
	app = Flask(__name__)
	app.register_blueprint(app_views)

	return app
