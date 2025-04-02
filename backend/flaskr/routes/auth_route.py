from flask import Blueprint, request, jsonify, current_app, url_for
from flask_cors import cross_origin
from itsdangerous import URLSafeTimedSerializer
from werkzeug.security import generate_password_hash
from flask_mail import Message
from flaskr.utils.config import Config
from flaskr.models import RolesEnum, User
from flaskr.services.auth_service import AuthService
from flaskr.utils.db import db
from flaskr.utils.mail import mail  # Import the mail instance from where it is initialized

auth_bp = Blueprint('auth_bp', __name__)
auth_service = AuthService()

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    required_fields = ['nombre_completo', 'email', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    nombre_completo = data['nombre_completo']
    email = data['email']
    password = data['password']
    rol = "voluntario"

    if '@' not in email:
        return jsonify({"error": "Invalid email format"}), 400

    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters"}), 400
    result, status = auth_service.signup(email, nombre_completo, password, rol)
    return jsonify(result), status

@auth_bp.route('/login', methods=['POST'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
def login():
    data = request.get_json()

    required_fields = ['email', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    email = data['email']
    password = data['password']

    result, status = auth_service.login(email, password)
    return jsonify(result), status


@auth_bp.route('/recover-password', methods=['POST', 'OPTIONS'])
@cross_origin(origins=["http://localhost:5173", "http://127.0.0.1:5173"], supports_credentials=True)
def recover_password():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    email = data.get('email')

    current_app.logger.info(f"Password reset requested for: {email}")

    # Rest of your function remains the same...

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        current_app.logger.info(f"User with email {email} not found")
        return jsonify({"message": "If the email exists, a reset link has been sent"}), 200

    try:
        current_app.logger.info("Creating password reset token")
        s = URLSafeTimedSerializer(Config.SECRET_KEY)
        token = s.dumps(email, salt='password-reset-salt')
        reset_url = url_for('auth_bp.reset_password', token=token, _external=True)

        current_app.logger.info(f"Reset URL created: {reset_url}")

        msg = Message(
            subject="Password Reset Request",
            recipients=[email],
            body=f"Please click this link to reset your password: {reset_url}\nThis link will expire in 1 hour."
        )

        current_app.logger.info(f"Attempting to send email to: {email}")
        mail.send(msg)
        current_app.logger.info("Email sent successfully according to Flask-Mail")
        return jsonify({"message": "If the email exists, a reset link has been sent"}), 200

    except Exception as e:
        current_app.logger.error(f"Email sending error: {str(e)}")
        import traceback
        current_app.logger.error(traceback.format_exc())
        return jsonify({"error": "Failed to send reset email"}), 500


@auth_bp.route('/reset-password/<token>', methods=['GET', 'POST'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
def reset_password(token):
    if request.method == 'GET':
        return '''
            <form method="POST">
                <label>New Password:</label>
                <input type="password" name="password" required>
                <input type="submit" value="Reset Password">
            </form>
        '''

    elif request.method == 'POST':
        new_password = request.form.get('password')

        if not new_password or len(new_password) < 8:
            return '''
                <script>
                    alert("Password must be at least 8 characters");
                    window.history.back();
                </script>
            '''

        try:
            s = URLSafeTimedSerializer(Config.SECRET_KEY)
            email = s.loads(token, salt='password-reset-salt', max_age=3600)
        except Exception:
            return '''
                <script>
                    alert("Invalid or expired reset link");
                    window.location.href = "http://localhost:5173/login";
                </script>
            '''

        user = User.query.filter_by(email=email).first()
        if not user:
            return '''
                <script>
                    alert("User not found");
                    window.location.href = "http://localhost:5173/login";
                </script>
            '''

        try:
            user.password = generate_password_hash(new_password)
            db.session.commit()
            return '''
                <script>
                    alert("Password reset successful! Redirecting to login...");
                    window.location.href = "http://localhost:5173/login";
                </script>
            '''
        except Exception as e:
            db.session.rollback()
            return '''
                <script>
                    alert("Failed to reset password. Please try again.");
                    window.history.back();
                </script>
            '''




