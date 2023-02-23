"""Server for coffee shop ratings website."""

import os
from flask import Flask, jsonify, request
from models import connect_to_db, db, User, Shop, Review


app = Flask(__name__)

db.init_app(app)


@app.route("/")
def index():
    return 'A very cool Flask API'


# 👤 User API routes - - - - -


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
    user = User(
        first_name=request_body['first_name'], 
        last_name=request_body['last_name'], 
        email=request_body['email'], 
        password=request_body['password']
    )

    db.session.add(user)
    db.session.commit()
   
    # http response with json data
    return {
        'id': user.user_id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    }


# ☕️ Shop API routes - - - - -

@app.route("/api/shop/<place_id>", methods=['GET'])
def get_shop(place_id):
    '''
    Get request from api
    '''

    shop = Shop.query.filter(Shop.google_map_id == place_id).first()
    if shop is None:
        return {}

    return {
        "shop_id": shop.shop_id,
        "google_map_id": shop.google_map_id
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


# 💭 Review API routes - - - - -


@app.route("/api/review/<place_id>", methods=['GET'])
def get_reviews(place_id):
    shop = Shop.query.filter(Shop.google_map_id == place_id).first()
    reviews = Review.query.filter(Review.shop_id == shop.shop_id).all()
    print(reviews)

    reviewsJson = []
    for review in reviews:
        reviewData = {
            'review_id': review.review_id,
            'rating_score': review.rating_score,
            'comment': review.comment,
            'user_id': review.user_id,
            'shop_id': review.shop_id
        }
        reviewsJson.append(reviewData)
    return reviewsJson


@app.route("/api/review/<place_id>", methods=['POST'])
def create_review(place_id):
    """ Create a new review"""
    
    request_body = request.get_json()
    
    user = User.query.first()
    shop = Shop.query.filter(Shop.google_map_id == place_id).first()
    print(user, shop)

    review = Review(
        rating_score=request_body['rating_score'], 
        comment=request_body['comment'], 
        user_id= user.user_id, # 
        shop_id=shop.shop_id,
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