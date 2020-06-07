import sqlite3

from source.db import db

class UserModel(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))

    # Linked Foreign Key
    items = db.relationship('ItemModel', lazy='dynamic')
    groups = db.relationship('GroupModel', lazy='dynamic')

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def json(self):
        # return {'name':self.name} # todo: json resturn updates
        # return {'username':self.username, 'items':[item.json() for item in self.items.all()]} # items.all() is because relationship is lazy=dynamic
        return {'username':self.username, 'groups':[group.json() for group in self.groups.all()]} # items.all() is because relationship is lazy=dynamic

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_name(cls,username):
        return cls.query.filter_by(username=username).first() # updated to use self since this is @classmethod

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
        
    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
