from django.conf import settings
import datetime
import jwt
from django.utils import timezone

class TokenEncoder:
    def access_token(user_id: int):
        payload = {
            'user': user_id,
            'iat': timezone.now(),
            'exp': timezone.now() + datetime.timedelta(minutes=1)
        }
        token = jwt.encode(
            payload,
            settings.ACCESS_TOKEN_KEY,
            "HS256"
        )
        return token
    
    def refresh_token(user_id: int):
        payload = {
            'user': user_id,
            'iat': timezone.now(),
            'exp': timezone.now() + datetime.timedelta(minutes=20)
        }
        token = jwt.encode(
            payload,
            settings.REFRESH_TOKEN_KEY,
            "HS256"
        )
        return token
    