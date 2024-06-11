from flask import Flask, render_template


app = Flask(__name__) # flask app intialization

@app.route('/')
def home():
    """
    This function is a route handler for the root URL ('/').
    It renders the 'home.html' template when accessed.

    Parameters:
    None

    Returns:
    A rendered HTML template (home.html)
    """
    return render_template('home.html')

@app.errorhandler(404)
def page_not_found(e):
    """
    Custom error handler for 404 Not Found error.
    This function is a route handler for the '/404' URL.
    It renders the '404.html' template when accessed.

    Parameters:
    e (Exception): The exception object that caused the error.

    Returns:
    A rendered HTML template (404.html) with a status code of 404.
    """
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='6000')
