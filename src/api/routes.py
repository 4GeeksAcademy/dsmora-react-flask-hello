"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, resources={"*": {"origins": "*"}})


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
@jwt_required()
def handle_users():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"msg": "Bad username or password", "code": 401 }), 401

    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))

    return jsonify(users), 200

@api.route('/create-token', methods=['POST'])
def create_token():
    body_request = request.get_json()
    email = body_request['email']
    password = body_request['password']
    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }), 200

# @api.route("/protected", methods=["GET"])
# @jwt_required()
# def protected():
#     # Access the identity of the current user with get_jwt_identity
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)

#     if User is None:
#         return jsonify({"msg": "Bad username or password"}), 401

#     return jsonify({"id": user.id, "username": user.username }), 200
