from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.request import Request
from rest_framework import status
from question.models import Question, Response as QuestionResponse, UserResponse, UserResponseChoice
from user.models import User
from question.serializers import UserResponseChoiceSerializer, UserResponseSerializer
import copy

class UserResponseView(APIView):
    def post(self, request: Request, question_id: int):
        data = copy.deepcopy(request.data)
        user_response_data = {
            'question': question_id,
            'participation': data['participation']
        }
        user_response_seriliazer = UserResponseSerializer(data=user_response_data)
        
        if not user_response_seriliazer.is_valid():
            return Response(
                user_response_seriliazer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user_response_seriliazer.save()
        
        try:
            choices = data['choices']
            for choice in choices:
                choice_data = {
                    'user_response': user_response_seriliazer.data['id'],
                    'response': choice['response']
                }
                choice_serializer = UserResponseChoiceSerializer(data=choice_data)
                if not choice_serializer.is_valid():
                    return Response(
                        choice_serializer.errors
                        , status=status.HTTP_400_BAD_REQUEST
                    )
                choice_serializer.save()
            return Response(
                {'user_response_id': user_response_seriliazer.data['id']}, 
                status=status.HTTP_201_CREATED
            )
        except KeyError:
            return Response(
                {
                    'msg': 'Something Went Wrong, Try Again Later'
                }
                , status=status.HTTP_400_BAD_REQUEST
            )