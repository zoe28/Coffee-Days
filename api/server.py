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
    return {
        'id': first_user.user_id,
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
    return {
        'id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    }


# Update new data on a existing user
@app.route("/api/user/<user_id>", methods=['POST'])
def update_user(user_id):
    """ Update data on a user"""

    # get fetch body from json
    request_body = request.get_json()

    # set a variable called user and equals to User database's user_id
    user = User.query.get(user_id)
    print(user)

    #user.name = 'New Name'
    print(request_body)
    user.first_name = request_body['first_name']
    user.last_name =  request_body['last_name']
    user.email =  request_body['email']
    
    db.session.commit()

    success = True # False
    error_message = ''

    return {
        'success': success,
        'error_message': error_message,
    }


# Create a new user to database
@app.route("/api/user/create", methods=['POST'])
def create_user():
    """ Create a new user"""

    # converts POST request body into python dictionary
    request_body = request.get_json()
    print(request_body)

    # create a new instance of the User model
    user = User(first_name=request_body['first_name'], last_name=request_body['last_name'], email=request_body['email'])

    db.session.add(user)
    db.session.commit()
   
    # http response with json data
    return {
        'id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    }



@app.route("/api/shop/<place_id>", methods=['POST'])
def create_shop(place_id):
    """ Create a new shop"""

    shop = Shop(
        google_map_id=place_id
    )
    db.session.add(shop)
    db.session.commit()
    return {
        "shop_id": shop.shop_id,
        "google_map_id": shop.google_map_id
    }


@app.route("/api/review/<place_id>", methods=['GET'])
def get_reviews(place_id):
    # TODO: query get all
    return Review.query.all(place_id)


@app.route("/api/review/<place_id>", methods=['POST'])
def create_review(place_id):
    """ Create a new review"""
    
    request_body = request.get_json()

    review = Review(
        review_id=request_body['review_id'], 
        rating_score=request_body['rating_score'], 
        comment=request_body['comment'], 
        user_id= "fc06e892-6c5a-42e4-ac53-d4842e4936e1", # 
        shop_id=place_id,
    )

    db.session.add(review)
    db.session.commit()

    return {
        'review_id': review.review_id,
        'rating_score': review.rating_score,
        'comment': review.comment,
        'user_id': review.user_id,
        'shop_id': review.shop_id
    }


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", port=5000, debug=True)