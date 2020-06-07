from flask_restful import Resource, reqparse
from flask_jwt import JWT, jwt_required
from source.models.item import ItemModel

class Item(Resource):
    # id, name, group_id, actual_amount, total_amount, unit
    
    parser = reqparse.RequestParser()
    parser.add_argument('group_id',
        type=int,
        required=True,
        help='Every item needs group id'
    )
    parser.add_argument('user_id',
        type=int,
        required=True,
        help='Every item needs group id'
    )
    parser.add_argument('actual_amount',
        type=float,
        required=True,
        help='this field cannot be left blank'
    )
    parser.add_argument('total_amount',
        type=float,
        required=True,
        help='this field cannot be left blank'
    )
    parser.add_argument('unit',
        type=str,
        required=True,
        help='this field cannot be left blank'
    )

    @jwt_required()
    def get(self, name):
        item = ItemModel.find_by_name(name)
        if item:
            return item.json()
        return {'message':'item not found'}, 404

    def post(self, name):
        if ItemModel.find_by_name(name):
            return {'message': "item with name '{}' already exists.".format(name)}, 400 # bad request

        data = Item.parser.parse_args()

        item = ItemModel(name,**data)

        try:
            item.save_to_db()
        except:
            return {'message':'an error occured'}, 500 # internal server error

        return item.json(), 201 # creating http status posted
        
    def delete(self, name):

        item = ItemModel.find_by_name(name)
        if item:
            item.delete_from_db()

        return {'message': 'delete is complete'}, 201 # creating http status posted
        
    def put(self, name):

        data = Item.parser.parse_args()

        item = ItemModel.find_by_name(name)
        try:
            if item:
                item.price = data['price']
            else:
                item = ItemModel(name, data['price'],data['group_id'])
        except:
            return {'message':'an error occured'}, 500 # internal server error

        item.save_to_db()

        return item.json(), 201 # creating http status posted
        

class ItemList(Resource):
    def get(self):
        return {'items': [item.json() for item in ItemModel.query.all()]}