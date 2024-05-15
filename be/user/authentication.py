from rest_framework.authentication import BaseAuthentication
from rest_framework.request import Request
from utils.TokenDecoder import TokenDecoder
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import AuthenticationFailed
from user.models import User
import jwt
from user.serializers import UserSerializer

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request: Request):
        
        authorization_header: str = request.headers.get("Authorization")
        print(authorization_header)
        
        if not authorization_header or not authorization_header.startswith("Bearer"):
            raise AuthenticationFailed('Not authenticated.')
        
        token = authorization_header.split(' ')[1]

        try:
            user_id = TokenDecoder.access_token(token)['user']
            user = get_object_or_404(User, id=user_id)

            return user, None
        except jwt.DecodeError:
            raise AuthenticationFailed('Invalid Token.')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired.')
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found.')
