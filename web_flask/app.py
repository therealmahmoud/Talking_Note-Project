from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')


@app.route('/hello')
def hello():
    return "Hello, World!"

@app.route('/test')
def test():
    return "Hello, from test!"
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='6000')
