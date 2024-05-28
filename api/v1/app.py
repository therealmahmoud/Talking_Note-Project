from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import logging

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://flask_user:flask_password@mysql/flask_db'
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

db = SQLAlchemy(app)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': "Not found"}), 404)


class Notes(db.Model):
    __tablename__ = 'notes'
    notes_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(45), nullable=False)
    content = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())

with app.app_context():
    db.create_all()


@app.route('/test', methods=['GET'], strict_slashes=False)
def test():
    return "hello from API", 200


@app.route('/notes', methods=['GET'], strict_slashes=False)
def get_all_notes():
    all_notes = Notes.query.all()
    lis = []
    for note in all_notes:
        list_notes = [
            {
                'notes_id': note.notes_id,
                'title': note.title,
                'content': note.content,
                'created_at': note.created_at,
                'updated_at': note.updated_at
            }
        ]
        lis.append(list_notes)
    return jsonify(lis), 200


@app.route('/notes/{id}', methods=['GET'], strict_slashes=False)
def get_notes_id(id):
    return 200


@app.route('/notes', methods=['POST'], strict_slashes=False)
def add_note():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    new_note = Notes(title=title, content=content)
    db.session.add(new_note)
    db.session.commit()

    return jsonify({'message': 'Note added successfully!'}), 201    


@app.route('/test', methods=['DELETE'], strict_slashes=False)
def delete_note():
    return 200


@app.route('/test', methods=['PUT'], strict_slashes=False)
def update_note():
    return 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6000, threaded=True)
