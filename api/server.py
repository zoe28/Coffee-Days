"""Server for coffee shop ratings website."""

from flask import Flask, jsonify, request
from models import connect_to_db, db, User, Shop, Review


app = Flask(__name__)


@app.route("/")
def index():
    return 'flask server'


@app.route("/api/user/first")
def get_first_user():
    first_user = User.query.first()
    # TODO: return the user id
    return {
        'first_name': first_user.first_name,
        'last_name': first_user.last_name,
        'email': first_user.email,
    }


# GET a user
@app.route("/api/user/<user_id>")
def get_user(user_id):
    """ Return a data on that user"""

    user = User.query.get(user_id)
    print(user)
    # TODO: return the user id
    return {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    }


# TODO: create a POST route that updates an existing user
@app.route("/api/user/<user_id>", methods=['POST'])
def update_user(user_id):
    """ Update data on a user"""

    users = User.query.get(user_id)
    db.session.commit()

    success = True # False
    error_message = ''
    
    return {
        success: success,
        error_message: error_message,
    }


@app.route("/api/user/create", methods=['POST'])
def create_user():
    """ Create a new user"""

    data = request.get_json()
    print(data)
    # create a new instance of the User model
    user = User(first_name=data['first_name'], last_name=data['last_name'], email=data['email'])

    db.session.add(user)
    db.session.commit()
   
    # http response with json data
    return {
        'id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    }


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port=5000, debug=True)