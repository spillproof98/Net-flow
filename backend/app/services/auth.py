from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)

def register_user(email: str, password: str):
    return {
        "email": email,
        "hashed_password": hash_password(password),
    }

def authenticate_user(user: dict, password: str):
    if not verify_password(password, user["hashed_password"]):
        return None
    return create_access_token(user["email"])
