"""Server for coffee shop ratings website."""

from flask import Flask, jsonify
from models import connect_to_db, db, User, Shop, Review


app = Flask(__name__)


@app.route("/")
def index():
    return 'flask server'


def jsonify_user(user):
    return jsonify({
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    })


@app.route("/api/user/first")
def get_first_user():
    first_user = User.query.first()
    return jsonify_user(first_user)


# GET a user
@app.route("/api/user/<user_id>")
def get_user(user_id):
    """ Return a data on that user"""

    user = User.query.get(user_id)
    print(user)
    return jsonify_user(user)


# TODO: create a POST route that updates an existing user
@app.route("/api/user/<user_id>", methods=['POST'])
def update_user(user_id):
    """ Update data on a user"""

    users = User.query.get(user_id)
    db.session.commit()

    # success = true/false

    # write some Flask SQLAlchemy code to update a model instance
    # commit the changes to the database

    return jsonify_user({})


# TODO: (future) create a POST route to create a new user


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port=5000, debug=True)