from flask_restful import Resource, reqparse
from flask_jwt import JWT, jwt_required
from source.models.atom import AtomModel

class Atom(Resource):
    # id, name, molecule_id, actual_amount, total_amount, unit
    
    parser = reqparse.RequestParser()
    parser.add_argument('molecule_id',
        type=int,
        required=True,
        help='Every atom needs molecule id'
    )
    parser.add_argument('user_id',
        type=int,
        required=True,
        help='Every atom needs molecule id'
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
        atom = AtomModel.find_by_name(name)
        if atom:
            return atom.json()
        return {'message':'atom not found'}, 404

    def post(self, name):
        if AtomModel.find_by_name(name):
            return {'message': "atom with name '{}' already exists.".format(name)}, 400 # bad request

        data = Atom.parser.parse_args()

        atom = AtomModel(name,**data)

        try:
            atom.save_to_db()
        except:
            return {'message':'an error occured'}, 500 # internal server error

        return atom.json(), 201 # creating http status posted
        
    def delete(self, name):

        atom = AtomModel.find_by_name(name)
        if atom:
            atom.delete_from_db()

        return {'message': 'delete is complete'}, 201 # creating http status posted
        
    def put(self, name):

        data = Atom.parser.parse_args()

        atom = AtomModel.find_by_name(name)
        try:
            if atom:
                # id, name, molecule_id, actual_amount, total_amount, unit
                
                atom.molecule_id = data['molecule_id']
                atom.actual_amount = data['actual_amount']
                atom.total_amount = data['total_amount']
                atom.unit = data['unit']
            else:
                atom = AtomModel(name, **data)
                # atom = AtomModel(name, data['price'],data['molecule_id'])
        except:
            return {'message':'an error occured'}, 500 # internal server error

        atom.save_to_db()

        return atom.json(), 201 # creating http status posted
        

class AtomList(Resource):
    def get(self):
        return {'atoms': [atom.json() for atom in AtomModel.query.all()]}