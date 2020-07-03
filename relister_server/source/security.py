from source.resources.user import UserModel
from werkzeug.security import safe_str_cmp

def authenticate(username, password):
    user = UserModel.find_by_username(username)
    # if user and safe_str_cmp(user.password, password):
    # if user.check_password(1,2):
    #     return user
    if user and user.check_password(password):
        return user


def identity(payload):
    user_id = payload['identity']
    return UserModel.find_by_id(user_id)