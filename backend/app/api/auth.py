from fastapi import APIRouter, HTTPException
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
import uuid

router = APIRouter(prefix="/api/auth", tags=["auth"])


JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret")
ALGO = "HS256"

ACCESS_EXPIRE_MINUTES = 15
REFRESH_EXPIRE_DAYS = 7

USERS = {}
REFRESH_TOKENS = {}


def create_access_token(email: str):
    return jwt.encode(
        {
            "sub": email,
            "exp": datetime.utcnow() + timedelta(minutes=ACCESS_EXPIRE_MINUTES),
        },
        JWT_SECRET,
        algorithm=ALGO,
    )


def create_refresh_token(email: str):
    token = jwt.encode(
        {
            "sub": email,
            "exp": datetime.utcnow() + timedelta(days=REFRESH_EXPIRE_DAYS),
            "jti": str(uuid.uuid4()),
        },
        JWT_SECRET,
        algorithm=ALGO,
    )
    REFRESH_TOKENS[token] = email
    return token


@router.post("/signup")
def signup(data: dict):
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(400, "Email and password required")

    if email in USERS:
        raise HTTPException(400, "User already exists")

    USERS[email] = {
        "id": str(uuid.uuid4()),
        "email": email,
        "password": password, 
    }

    return {"message": "User created successfully"}


@router.post("/login")
def login(data: dict):
    email = data.get("email")
    password = data.get("password")

    user = USERS.get(email)
    if not user or user["password"] != password:
        raise HTTPException(401, "Invalid credentials")

    return {
        "access_token": create_access_token(email),
        "refresh_token": create_refresh_token(email),
        "user": {
            "id": user["id"],
            "email": email,
        },
    }


@router.post("/refresh")
def refresh(data: dict):
    refresh_token = data.get("refresh_token")

    if refresh_token not in REFRESH_TOKENS:
        raise HTTPException(401, "Invalid refresh token")

    try:
        payload = jwt.decode(refresh_token, JWT_SECRET, algorithms=[ALGO])
        email = payload["sub"]
    except JWTError:
        raise HTTPException(401, "Expired refresh token")

    return {
        "access_token": create_access_token(email)
    }


@router.post("/logout")
def logout(data: dict):
    refresh_token = data.get("refresh_token")
    REFRESH_TOKENS.pop(refresh_token, None)
    return {"message": "Logged out"}
