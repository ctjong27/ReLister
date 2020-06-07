from source.db import db

class GroupModel(db.Model):
    # id, user_id, name

    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(80))

    # Linked Foreign Key
    items = db.relationship('ItemModel', lazy='dynamic')
    
    # Foreign Key
    user = db.relationship('UserModel')

    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id

    def json(self):
        return {'name':self.name, 'items':[item.json() for item in self.items.all()]} # items.all() is because relationship is lazy=dynamic

    @classmethod
    def find_by_name(cls,name):
        return cls.query.filter_by(name=name).first() # updated to use self since this is @classmethod

    def save_to_db(self): # update/inserting = upserting the database
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()