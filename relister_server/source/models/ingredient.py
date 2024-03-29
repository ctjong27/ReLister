from source.db import db

class IngredientModel(db.Model):
    # id, recipe_id, user_id, name, actual_amount, total_amount, unit

    __tablename__ = 'ingredient'

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))#, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))#, primary_key=True)
    name = db.Column(db.String(80))
    actual_amount = db.Column(db.Float(precision=2))
    total_amount = db.Column(db.Float(precision=2))
    unit = db.Column(db.String(80))

    # Foreign Key
    recipe = db.relationship('RecipeModel')
    user = db.relationship('UserModel')

    def __init__(self, name, recipe_id, user_id, actual_amount, total_amount, unit):
        self.name = name
        self.recipe_id = recipe_id
        self.user_id = user_id
        self.actual_amount = actual_amount
        self.total_amount = total_amount
        self.unit = unit

    def json(self):
        return {'id': self.id,
                'recipe_id': self.recipe_id,
                'user_id': self.user_id,
                'name': self.name,
                'actual_amount': self.actual_amount,
                'total_amount': self.total_amount,
                'unit': self.unit}

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def get_shopping_list(self):
        return self.query.filter(self.actual_amount<self.total_amount)

    @classmethod
    def get_pantry_list(self):
        return self.query.filter(self.actual_amount>=self.total_amount)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
