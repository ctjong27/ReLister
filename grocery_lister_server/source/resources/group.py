from flask_restful import Resource, reqparse
from source.models.group import GroupModel

class Group(Resource): # extending resource class

    # Require the eistence of Parameters
    parser = reqparse.RequestParser()
    parser.add_argument('user_id',
        type=int,
        required=True,
        help='Every item needs user id'
    )

    def get(self, name):
        group = GroupModel.find_by_name(name)
        if group:
            return group.json()
        return {'message':'group not found'}, 404

    def post(self, name):
        if GroupModel.find_by_name(name):
            return {'messsage':'group {} already exists'.format(name)}, 400

        data = Group.parser.parse_args()

        group = GroupModel(name, **data)
        try:
            group.save_to_db()
        except:
            return {'message':'an error occured when creating group'}, 500

        return group.json(), 201

    def delete(self, name):
        group = GroupModel.find_by_name(name)
        if group:
            group.delete_from_db()
        else:
            return {'message':'group does not exist'}

        return {'message':'group is deleted'}

class GroupList(Resource):
    def get(self):
        return {'groups': [group.json() for group in GroupModel.query.all()]}