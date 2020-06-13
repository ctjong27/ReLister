from flask_restful import Resource, reqparse
from source.models.recipe import RecipeModel

class Recipe(Resource): # extending resource class

    # Require the eistence of Parameters
    parser = reqparse.RequestParser()
    parser.add_argument('user_id',
        type=int,
        required=True,
        help='Every ingredient needs user id'
    )

    def get(self, name):
        recipe = RecipeModel.find_by_name(name)
        if recipe:
            return recipe.json()
        return {'message':'recipe not found'}, 404

    def post(self, name):
        
        if RecipeModel.find_by_name(name):
            return {'messsage':'recipe {} already exists'.format(name)}, 400

        data = Recipe.parser.parse_args()

        recipe = RecipeModel(name, **data)
        try:
            recipe.save_to_db()
        except:
            return {'message':'an error occured when creating recipe'}, 500

        return recipe.json(), 201

    def delete(self, name):
        recipe = RecipeModel.find_by_name(name)

        # todo: do not allow the default 1 to be deletable
        if recipe:
            recipe.delete_from_db()
        else:
            return {'message':'recipe does not exist'}

        return {'message':'recipe is deleted'}

class RecipeList(Resource):
    def get(self):
        # return {'recipes': [recipe.json() for recipe in RecipeModel.query.all()]}
        return [recipe.json() for recipe in RecipeModel.query.all()]