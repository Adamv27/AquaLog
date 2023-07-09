from flask import Flask
from markupsafe import escape

def create_app():
    app = Flask(__name__)
    return app


app = create_app()


@app.route("/")
def hello_world():
    return "<p>Hello, World</p>"


@app.route('/fish/<fish>')
def show_fish(fish):
    return f'Fish: {escape(fish)}'



