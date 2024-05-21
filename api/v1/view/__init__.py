#!/usr/bin/python3
""" The init file if the api."""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from .route import *
