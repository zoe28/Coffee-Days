"""
Define Model Classes
"""

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
    email = db.Column(db.String(128), nullable=False)

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
    leonard = User(first_name='Leonard', last_name='Woods', email="leonard@gmail.com")
    liz = User(first_name='Liz', last_name='Suuu', email="lizss@gmail.com")
    peter = User(first_name='Peter', last_name='Collins', email="peter@gmail.com")
    howl = User(first_name='Howl', last_name='Takuya', email="howl@gmail.com")

    db.session.add_all([leonard, liz, peter, howl])
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
