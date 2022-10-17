"""
Define database models
"""

from typing_extensions import Required
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
import uuid


db = SQLAlchemy()

class User(db.Model):
    """ A user """

    __tablename__ = "users"

    user_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    reviews = db.relationship("Review", back_populates="user")

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"


class Shop(db.Model):
    """ A coffee shop """

    __tablename__ = "shops"

    shop_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    google_map_id = db.Column(db.String(64), nullable=True)
    yelp_id = db.Column(db.String(64), nullable=True)

    reviews = db.relationship("Review", back_populates="shop")

    def __repr__(self):
        return f"<Shop shop_id={self.shop_id} google_map_id={self.google_map_id}>"


class Review(db.Model):
    """ A coffee shop's reviews """

    __tablename__ = "reviews"

    review_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    rating_score = db.Column(db.Integer, nullable=True)
    comment = db.Column(db.Text, nullable=True)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("users.user_id"))
    shop_id = db.Column(UUID(as_uuid=True), db.ForeignKey("shops.shop_id"))


    user = db.relationship("User", back_populates="reviews")
    shop = db.relationship("Shop", back_populates="reviews")
    

    def __repr__(self):
        return f"<Review review_id={self.review_id} rating_score={self.rating_score}>"


# --------------------------------


def add_example_data():
    """Create some sample data."""

    # In case this is run more than once, empty out existing data so we don't add duplicates
    User.query.delete()
    Shop.query.delete()
    Review.query.delete()

    # Add sample users
    leonard = User(first_name='Leonard', last_name='Woods', email="leonard@gmail.com", password="123")
    liz = User(first_name='Liz', last_name='Suuu', email="lizss@gmail.com", password="223")
    peter = User(first_name='Peter', last_name='Collins', email="peter@gmail.com", password="290")
    howl = User(first_name='Howl', last_name='Takuya', email="howl@gmail.com", password="909")


    # add sample Shop data with the Google Maps `result.place_id`
    # couldn't get some coffee shop's id on the map
    blue_bottle_coffee = Shop(google_map_id="ChIJ1VGyjmCBhYAR_pOL0q5shVs") 
    ritual_coffee_roasters = Shop(google_map_id="ChIJf2VE9ayAhYARcESkjlMUzfU") 
    andytown_coffee_roasters = Shop(google_map_id="ChIJee4DupqHhYARXadb2DlBtr8") 
    philz_coffee = Shop(google_map_id="ChIJcfQ5MRp-j4ARn3eA9EH16OA") 
    coffee_movement = Shop(google_map_id="ChIJoTMb3PKAhYARsXkQt469sBw") 
    # sightglass_coffee = Shop(google_map_id="") 


    db.session.add_all([
        leonard, liz, peter, howl, ])
    db.session.add_all([
        blue_bottle_coffee, ritual_coffee_roasters, andytown_coffee_roasters, philz_coffee, coffee_movement])
    db.session.commit()


    # add sample Review data
    review1 = Review(
        rating_score = 5,
        comment = "This shop serve great espresso, which is well prepared and on par with other specialty shops, but what really makes them stand out are the coffee creations they serve.",
        user_id = leonard.user_id, # "fc06e892-6c5a-42e4-ac53-d4842e4936e1"
        shop_id = blue_bottle_coffee.shop_id
    )

    review2 = Review(
        rating_score = 5,
        comment = "This is my favourite coffee shop in town.  The espresso is so balanced.  I would describe it as a very sophisticated flavour, you can clearly distinguish several layers of taste.",
        user_id = leonard.user_id, # "fc06e892-6c5a-42e4-ac53-d4842e4936e1",
        shop_id = andytown_coffee_roasters.shop_id
    )

    review3 = Review(
        rating_score = 5,
        comment = "This shop is absolutely a (hidden) gem! Easily one of my top two coffee shops in the area and I have been to a few dozen.",
        user_id = liz.user_id, # "5c23b423-87f7-42aa-a176-ced2159da035",
        shop_id = coffee_movement.shop_id
    )

    review4 = Review(
        rating_score = 3,
        comment = "Coffee is good but has a long wait",
        user_id = leonard.user_id, # "fc06e892-6c5a-42e4-ac53-d4842e4936e1",
        shop_id = blue_bottle_coffee.shop_id
    )

    review5 = Review(
        rating_score = 1,
        comment = "This shop does not have customer restroom or wifi. Music too loud and super slow service!",
        user_id = leonard.user_id, # "fc06e892-6c5a-42e4-ac53-d4842e4936e1",
        shop_id = ritual_coffee_roasters.shop_id
    )


    db.session.add_all([
        review1, review2, review3, review4, review5])
    db.session.commit()


def connect_to_db(app):
    """Connect the database to our Flask app."""
    
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///coffee_shop"
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    print("Connected to the db")


if __name__=="__main__":
    from flask import Flask
    
    app = Flask(__name__)
    connect_to_db(app)

    db.create_all()
    add_example_data()
