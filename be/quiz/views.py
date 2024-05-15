from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.request import Request
from rest_framework import status
from quiz.models import Quiz, Participation
from question.models import Question, Response as QuestionResponse
from user.models import User
from quiz.serializers import QuizSerializer, QuizCUSerializer, ParticipationSerializer
from question.serializers import QuestionCUSerializer, ResponseSerializer, UserResponseSerializer
from utils.generator import generator
from user.authentication import JWTAuthentication
from question.models import UserResponse
import copy

class QuizView(APIView):

    def get(self, request: Request):
        pass

    def post(self, request: Request):
        data = copy.deepcopy(request.data)
        data['code'] = generator(settings.QUIZ_CODE_LENGTH)
        data['user'] = request.user.id
        quiz_serializer = QuizCUSerializer(data=data)
        if not quiz_serializer.is_valid():
            return Response(
                quiz_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        quiz_serializer.save()
        try:
            # storing questions
            questions = data['questions']
            for question in questions:
                question_data = question
                question_data['quiz'] = quiz_serializer.data['id']
                if int(question['duration']) < 10:
                    question['duration'] = 10
                question_serializer = QuestionCUSerializer(data=question_data)
                if not question_serializer.is_valid():
                    quiz = get_object_or_404(Quiz, pk=quiz_serializer.data['id'])
                    return Response(
                        question_serializer.errors
                        , status=status.HTTP_400_BAD_REQUEST
                    )
                question_serializer.save()
                # storing responses
                responses = question['responses']
                for response in responses:
                    response_data = response
                    response_data['question'] = question_serializer.data['id']
                    response_serializer = ResponseSerializer(data=response_data)
                    if not response_serializer.is_valid():
                        quiz = get_object_or_404(Quiz, pk=quiz_serializer.data['id'])
                        return Response(
                            response_serializer.errors
                            , status=status.HTTP_400_BAD_REQUEST
                        )
                    response_serializer.save()
            full_quiz = Quiz.objects.get(pk=quiz_serializer.data['id'])
            return Response(
                QuizSerializer(full_quiz).data
                , status=status.HTTP_201_CREATED)
        except KeyError:
            return Response(
                {
                    'msg': 'Something Went Wrong, Try Again Later'
                }
                , status=status.HTTP_400_BAD_REQUEST
            )


class QuizDetailsView(APIView):
    def get(self, request: Request, id: int):

        quiz = get_object_or_404(Quiz, id=id)

        quiz_serializer = QuizSerializer(quiz)

        return Response(
            quiz_serializer.data
            , status=status.HTTP_200_OK)

    def put(self, request: Request, id: int):
        data = copy.deepcopy(request.data)
        quiz = get_object_or_404(Quiz, id=id)
        
        data['code'] = quiz.code
        
        quiz_serializer = QuizCUSerializer(quiz, data=data)
        if not quiz_serializer.is_valid():
            return Response(
                quiz_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        quiz_serializer.save()

        try:
            # updating questions
            questions = data['questions']
            for question in questions:
                question_data = question
                og_question = get_object_or_404(Question, id=question_data['id'])
                question_data['quiz'] = og_question.quiz.id
                question_serializer = QuestionCUSerializer(og_question, data=question_data)
                if not question_serializer.is_valid():
                    return Response(
                        question_serializer.errors
                        , status=status.HTTP_400_BAD_REQUEST
                    )
                question_serializer.save()
                # updating responses
                responses = question['responses']
                for response in responses:
                    response_data = response
                    og_response = get_object_or_404(QuestionResponse, id=response_data['id'])
                    response_data['question'] = og_response.question.id
                    response_serializer = ResponseSerializer(og_response, data=response_data)
                    if not response_serializer.is_valid():
                        return Response(
                            response_serializer.errors
                            , status=status.HTTP_400_BAD_REQUEST
                        )
                    response_serializer.save()
            full_quiz = Quiz.objects.get(pk=quiz_serializer.data['id'])
            return Response(
                QuizSerializer(full_quiz).data
                , status=status.HTTP_200_OK)
        except KeyError:
            return Response(
                {
                    'msg': 'Something Went Wrong, Try Again Later'
                }
                , status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request: Request, id: int):
        quiz = get_object_or_404(Quiz, id=id)
        quiz.delete()
        return Response(status=status.HTTP_200_OK)


class UserResponseView(APIView):
    def put(self, request: Request, id: int):
        score = request.data['score']

        user_response = get_object_or_404(UserResponse, pk=id)
        serializer = UserResponseSerializer(user_response, data={'score': score}, partial=True)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(status=status.HTTP_200_OK)


class UserScoreView(APIView):
    def put(self, request: Request, id: int):
        score = request.data['score']

        participation = get_object_or_404(Participation, pk=id)

        serializer = ParticipationSerializer(
            participation, 
            data={'score': score},
            partial=True
        )
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(status=status.HTTP_200_OK)


class QuizParticipationView(APIView):

    # get quiz by code
    def get(self, request: Request, code: str):
        quiz = Quiz.objects.filter(code=code).first()

        if quiz is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        quiz_serializer = QuizSerializer(quiz)
        return Response(
            quiz_serializer.data
            , status=status.HTTP_200_OK)
    
    # apply for a quiz
    def post(self, request: Request, code: str):
        quiz = get_object_or_404(Quiz, id=request.data['quiz'])

        if quiz is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if quiz.user.id == request.user.id :
            return Response({'msg': "Can't participate in your quiz"},status=status.HTTP_403_FORBIDDEN)
        

        participation = {
            'user': request.user.id,
            'quiz': quiz.id,
            'score': 0,
        }
        serializer = ParticipationSerializer(data=participation)

        if not serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data['id'],status=status.HTTP_201_CREATED)


class ParticipationView(APIView):
    def delete(self, request: Request, id: int):

        participation = get_object_or_404(Participation, id=id)

        quiz = get_object_or_404(Quiz, id=participation.quiz.id)

        if quiz.status != 'pending':
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        participation.delete()
        return Response(status=status.HTTP_200_OK)


class UserQuizView(APIView):
    def get(self, request: Request):
        quizzes = Quiz.objects.filter(user=request.user.id)
        return Response(
            QuizSerializer(quizzes, many=True).data,
            status=status.HTTP_200_OK
        )
