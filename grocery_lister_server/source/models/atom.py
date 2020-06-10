from source.db import db

class AtomModel(db.Model):
    # id, molecule_id, user_id, name, actual_amount, total_amount, unit

    __tablename__ = 'atoms'
    
    name = db.Column(db.String(80))
    id = db.Column(db.Integer, primary_key=True)
    molecule_id = db.Column(db.Integer, db.ForeignKey('molecule.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    actual_amount = db.Column(db.Float(precision=2))
    total_amount = db.Column(db.Float(precision=2))
    unit = db.Column(db.String(80))

    # Foreign Key
    molecule = db.relationship('MoleculeModel')
    user = db.relationship('UserModel')
    
    def __init__(self, name, molecule_id, user_id, actual_amount, total_amount, unit):
        self.name = name
        self.id = 1
        self.molecule_id = molecule_id
        self.user_id = user_id
        self.actual_amount = actual_amount
        self.total_amount = total_amount
        self.unit = unit

    def json(self):
        return {'name':self.name, 'actual_amount':self.actual_amount, 'total_amount':self.total_amount, 'unit':self.unit}

    @classmethod
    def find_by_name(cls,name):
        return cls.query.filter_by(name=name).first()
        
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()