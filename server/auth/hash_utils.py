import bcrypt

def hash_password(plain_passwords: str) -> str:
    hashed = bcrypt.hashpw(plain_passwords.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))