from source.db import db

class RecipeModel(db.Model):
    # id, user_id, name

    __tablename__ = 'recipe'

    name = db.Column(db.String(80))
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)

    # Linked Foreign Key
    ingredients = db.relationship('IngredientModel', lazy='dynamic')
    
    # Foreign Key
    user = db.relationship('UserModel')

    def __init__(self, name, user_id):
        self.name = name
        self.id = 1
        self.user_id = user_id

    def json(self):
        return {'name':self.name, 'ingredients':[ingredient.json() for ingredient in self.ingredients.all()]} # ingredients.all() is because relationship is lazy=dynamic

    @classmethod
    def find_by_name(cls,name):
        return cls.query.filter_by(name=name).first() # updated to use self since this is @classmethod

    def save_to_db(self): # update/inserting = upserting the database
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()