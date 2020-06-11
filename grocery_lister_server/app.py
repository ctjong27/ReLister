from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt import JWT

from source.security import authenticate, identity
from source.resources.user import UserRegister, UserDetail
from source.resources.recipe import Recipe, RecipeList
from source.resources.ingredient import Ingredient, IngredientList
from source.db import db

from datetime import timedelta
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///data.db') # if first variable is not found, 2nd is used
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = 'secretkey'
api = Api(app)

@app.before_first_request
def create_tables():
    db.create_all()

app.config['JWT_AUTH_URL_RULE'] = '/login' # sets the /auth to /login
app.config['JWT_EXPIRATION_DELTA'] = timedelta(seconds=1800)
app.config['JWT_AUTH_USERNAME_KEY'] = 'email'

jwt = JWT(app, authenticate, identity) 

@jwt.auth_response_handler
def customized_response_handler(access_token, identity):
    return jsonify({
        'access_token': access_token.decode('utf-8'),
        'user_id': identity.id
    })

@jwt.jwt_error_handler
def customized_error_handler(error):
    return jsonify({
        'message': error.description,
        'code': error.status_code
    }), error.status_code


api.add_resource(Ingredient, '/ingredient/<string:name>') # https://localhost:5000/student/Rolf
api.add_resource(IngredientList, '/ingredients')
api.add_resource(Recipe, '/recipe/<string:name>')
api.add_resource(RecipeList, '/recipes')
api.add_resource(UserRegister, '/register')
api.add_resource(UserDetail, '/user/<string:username>')

if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)