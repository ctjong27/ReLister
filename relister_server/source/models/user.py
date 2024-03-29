import sqlite3
from source.db import db
from werkzeug.security import generate_password_hash, check_password_hash

class UserModel(db.Model):

    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    # password = db.Column(db.String(80))
    password = db.Column(db.String(300), nullable=False)

    # Linked Foreign Key
    ingredients = db.relationship('IngredientModel', lazy='dynamic')
    recipes = db.relationship('RecipeModel', lazy='dynamic')

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def json(self):
        # return {'username':self.username, 'ingredients':[ingredient.json() for item in self.ingredients.all()]} # ingredients.all() is because relationship is lazy=dynamic
        return {'username':self.username, 'recipes':[recipe.json() for recipe in self.recipes.all()]} # recipes.all() is because relationship is lazy=dynamic

    def save_to_db(self):
        self.set_password(self.password)
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_name(cls,username):
        return cls.query.filter_by(username=username).first() # updated to use self since this is @classmethod

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
        
    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
