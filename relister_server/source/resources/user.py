import sqlite3
from flask_restful import Resource, reqparse
from source.models.user import UserModel
from source.models.recipe import RecipeModel

class UserRegister(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('username',
        type=str,
        required=True,
        help='this field is required'
    )
    parser.add_argument('password',
        type=str,
        required=True,
        help='this field is required'
    )

    def post(self):
        data = UserRegister.parser.parse_args() # part of flask restful

        if UserModel.find_by_username(data['username']):
            return {'message':'user with that username already exists'}, 400 # bad request

        user = UserModel(**data)
        user.save_to_db()
        
        # Initialize onetime recipe
        onetime_recipe = RecipeModel('onetime', user.id)
        onetime_recipe.id = 0
        onetime_recipe.relist = True
        RecipeModel.save_to_db(onetime_recipe)

        # Initialize relist recipe
        relist_recipe = RecipeModel('relist', user.id)
        relist_recipe.id = 1
        relist_recipe.relist = False
        RecipeModel.save_to_db(relist_recipe)

        return {'message': 'user created successfully'}, 201 # created response

class UserDetail(Resource):

    def get(self, username):
        user = UserModel.find_by_name(username)
        if user:
            return user.json()
        return {'message':'user not found'}, 404
