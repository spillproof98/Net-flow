import uuid
from datetime import datetime

def create_stack(name: str, user_id: str):
    return {
        "id": str(uuid.uuid4()),
        "name": name,
        "user_id": user_id,
        "created_at": datetime.utcnow(),
    }
