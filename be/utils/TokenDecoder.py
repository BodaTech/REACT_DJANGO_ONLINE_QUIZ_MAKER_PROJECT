from django.conf import settings
import datetime
import jwt


class TokenDecoder:
    def access_token(token):
        try:
            payload = jwt.decode(
                token,
                settings.ACCESS_TOKEN_KEY,
                ["HS256"]
            )
            return payload
        except jwt.DecodeError:
            raise jwt.DecodeError
        except jwt.ExpiredSignatureError:
            raise jwt.ExpiredSignatureError


    def refresh_token(token):
        try:
            payload = jwt.decode(
                token,
                settings.REFRESH_TOKEN_KEY,
                ["HS256"]
            )
            return payload
        except jwt.DecodeError:
            raise jwt.DecodeError
        except jwt.ExpiredSignatureError:
            raise jwt.ExpiredSignatureError