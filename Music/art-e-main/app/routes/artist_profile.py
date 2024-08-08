from flask import Blueprint, request, jsonify
from app import db
from app.models import ArtistProfile
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('artist_profile', __name__, url_prefix='/profile')

@bp.route('', methods=['POST'])
@jwt_required()
def create_profile():
    data = request.get_json()
    if not data or 'bio' not in data or 'portfolio_url' not in data:
        return jsonify(message="Invalid data. 'bio' and 'portfolio_url' are required."), 400
    
    bio = data['bio']
    portfolio_url = data['portfolio_url']
    
    user_id = get_jwt_identity()

    existing_profile = ArtistProfile.query.filter_by(user_id=user_id).first()
    if existing_profile:
        return jsonify(message="Profile already exists."), 409

    profile = ArtistProfile(user_id=user_id, bio=bio, portfolio_url=portfolio_url)
    db.session.add(profile)
    db.session.commit()

    return jsonify(message="Profile created successfully"), 201

@bp.route('', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()
    if not data:
        return jsonify(message="Invalid data. At least one field is required."), 400

    user_id = get_jwt_identity()
    profile = ArtistProfile.query.filter_by(user_id=user_id).first_or_404()

    profile.bio = data.get('bio', profile.bio)
    profile.portfolio_url = data.get('portfolio_url', profile.portfolio_url)

    db.session.commit()

    return jsonify(message="Profile updated successfully"), 200

@bp.route('', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    profile = ArtistProfile.query.filter_by(user_id=user_id).first_or_404()

    return jsonify({
        'bio': profile.bio,
        'portfolio_url': profile.portfolio_url
    }), 200
