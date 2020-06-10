from flask_restful import Resource, reqparse
from source.models.molecule import MoleculeModel

class Molecule(Resource): # extending resource class

    # Require the eistence of Parameters
    parser = reqparse.RequestParser()
    parser.add_argument('user_id',
        type=int,
        required=True,
        help='Every atom needs user id'
    )

    def get(self, name):
        molecule = MoleculeModel.find_by_name(name)
        if molecule:
            return molecule.json()
        return {'message':'molecule not found'}, 404

    def post(self, name):
        
        if MoleculeModel.find_by_name(name):
            return {'messsage':'molecule {} already exists'.format(name)}, 400

        data = Molecule.parser.parse_args()

        molecule = MoleculeModel(name, **data)
        try:
            molecule.save_to_db()
        except:
            return {'message':'an error occured when creating molecule'}, 500

        return molecule.json(), 201

    def delete(self, name):
        molecule = MoleculeModel.find_by_name(name)
        if molecule:
            molecule.delete_from_db()
        else:
            return {'message':'molecule does not exist'}

        return {'message':'molecule is deleted'}

class MoleculeList(Resource):
    def get(self):
        return {'molecules': [molecule.json() for molecule in MoleculeModel.query.all()]}