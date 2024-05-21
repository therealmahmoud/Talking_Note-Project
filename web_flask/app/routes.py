from flask import current_app as app

@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/test')
def test():
    return "Hello, from test!"

