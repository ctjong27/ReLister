import sqlite3
from flask_restful import Resource, reqparse
from source.models.user import UserModel

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

        return {'message': 'user created successfully'}, 201 # created response

class UserDetail(Resource):

    def get(self, username):
        user = UserModel.find_by_name(username)
        if user:
            return user.json()
        return {'message':'user not found'}, 404