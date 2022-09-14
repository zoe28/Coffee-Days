"""Server for coffee shop ratings website."""

from flask import Flask, jsonify
from models import connect_to_db, db, User, Shop, Review


app = Flask(__name__)

@app.route("/")
def index():
    return 'flask server'

@app.route("/api/user/<user_id>")
def get_user(user_id):
    """ Return a data on that user"""

    user = User.query.get(user_id)
    print(user)
    return jsonify({
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    })


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port=5000, debug=True)