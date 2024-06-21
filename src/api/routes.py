"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt


api = Blueprint('api', __name__)

# Allow CORS requests to this API

"""
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = os.getenv("JWT-KEY")
jwt = JWTManager(app)

"""
bcrypt = Bcrypt()

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def sign_up():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg":"El body es obligatrio"}), 400
    if "email" not in body:
        return jsonify({"msg":"El campo email es obligatorio"}), 400
    if "password" not in body:
        return jsonify({"msg":"El campo password es obligatorio"}), 400
    
    new_user = User()
    new_user.email = body["email"]
    new_user.password = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_user.is_active = True
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "ok"}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"msg": "Es obligatorio que llenen el body"}), 400
    if "email" not in body:
        return jsonify({"msg":"El campo email es obligatrio"}), 400
    if "password" not in body:
        return jsonify({"msg": "El campo password es obligatorio"}), 400
    user = User.query.filter_by(email=body["email"]).first()
    if user is None:
        return jsonify({"msg": "user or password invalid"}), 400
    
    correct_password = bcrypt.check_password_hash(user.password, body['password'])

    if correct_password == False:
        return jsonify({"msg": "user or password invalid"}), 400
    
    access_token = create_access_token(identity=user.email)
    return jsonify({"msg": "Ok", "access_token": access_token}), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200