from flask_restful import Resource, reqparse
from flask_jwt import JWT, jwt_required
from source.models.ingredient import IngredientModel

class Ingredient(Resource):
    # id, name, recipe_id, actual_amount, total_amount, unit
    
    parser = reqparse.RequestParser()
    parser.add_argument('recipe_id',
        type=int,
        required=True,
        help='Every ingredient needs recipe id'
    )
    parser.add_argument('user_id',
        type=int,
        required=True,
        help='Every ingredient needs recipe id'
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
        ingredient = IngredientModel.find_by_name(name)
        if ingredient:
            return ingredient.json()
        return {'message':'ingredient not found'}, 404

    def post(self, name):
        if IngredientModel.find_by_name(name):
            return {'message': "ingredient with name '{}' already exists.".format(name)}, 400 # bad request

        data = Ingredient.parser.parse_args()

        ingredient = IngredientModel(name,**data)

        try:
            ingredient.save_to_db()
        except:
            return {'message':'an error occured'}, 500 # internal server error

        return ingredient.json(), 201 # creating http status posted
        
    def delete(self, name):

        ingredient = IngredientModel.find_by_name(name)
        if ingredient:
            ingredient.delete_from_db()

        return {'message': 'delete is complete'}, 201 # creating http status posted
        
    def put(self, name):

        data = Ingredient.parser.parse_args()

        ingredient = IngredientModel.find_by_name(name)
        try:
            if ingredient:
                # id, name, recipe_id, actual_amount, total_amount, unit
                
                ingredient.recipe_id = data['recipe_id']
                ingredient.actual_amount = data['actual_amount']
                ingredient.total_amount = data['total_amount']
                ingredient.unit = data['unit']
            else:
                ingredient = IngredientModel(name, **data)
                # ingredient = IngredientModel(name, data['price'],data['recipe_id'])
        except:
            return {'message':'an error occured'}, 500 # internal server error

        ingredient.save_to_db()

        return ingredient.json(), 201 # creating http status posted
        

class IngredientList(Resource):
    def get(self):
        return {'ingredients': [ingredient.json() for ingredient in IngredientModel.query.all()]}