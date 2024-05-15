from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.request import Request
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import check_password
from user.serializers import UserSerializer
from user.models import User
from utils.TokenEncoder import TokenEncoder
from utils.TokenDecoder import TokenDecoder
import jwt


# handle user authentication process
class AuthView(APIView):
    authentication_classes = []
    # get user information
    def get(self, request: Request):
        serializer = UserSerializer(request.user)
        return Response(
            {'user': serializer.data}
        , status=status.HTTP_200_OK)

    # handle login logic
    def post(self, request: Request):
        try:
            username = request.data['username']
            password = request.data['password']

            user = User.objects.filter(username=username).first()
            if user is None:
                return Response({'msg': 'Invalid Credential.'},status=status.HTTP_401_UNAUTHORIZED)
            
            if not check_password(password, user.password):
                raise AuthenticationFailed('Invalid Credential.')
            
            access_token = TokenEncoder.access_token(user.id)
            refresh_token = TokenEncoder.refresh_token(user.id)
            
            response = Response()
            response.data = {
                'access_token': access_token
            }
            response.set_cookie('refresh_token', refresh_token)
            response.status_code = status.HTTP_200_OK
            
            return response

        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    authentication_classes = []
    # handle register logic
    def post(self, request: Request):
        serilaizer = UserSerializer(data=request.data)
        if not serilaizer.is_valid():
            return Response(
                serilaizer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        serilaizer.save()
        return Response(status=status.HTTP_201_CREATED)    


class TokenView(APIView):
    authentication_classes = []
    #refresh token logic
    def post(self, request: Request):

        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            payload = TokenDecoder.refresh_token(refresh_token)
            user = get_object_or_404(User, pk=payload["user"])

            access_token = TokenEncoder.access_token(user.id)
        
            return Response({
                'access_token': access_token
            }, status=status.HTTP_200_OK)
        
        except jwt.DecodeError:
            raise AuthenticationFailed('Invalid Token.')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired.')
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found.')


class LogoutView(APIView):
    def post(self, request: Request):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        response = Response()
        response.delete_cookie('refresh_token')
        response.status_code = 200
        return response