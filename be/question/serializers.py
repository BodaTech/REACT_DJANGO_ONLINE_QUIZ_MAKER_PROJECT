from rest_framework.serializers import ModelSerializer
from question.models import Question, Response, UserResponse, UserResponseChoice


class ResponseSerializer(ModelSerializer):
    class Meta:
        model = Response
        fields = '__all__'


class QuestionSerializer(ModelSerializer):
    responses = ResponseSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = '__all__'


class QuestionCUSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class UserResponseSerializer(ModelSerializer):
    class Meta:
        model = UserResponse
        fields = '__all__'


class UserResponseChoiceSerializer(ModelSerializer):
    class Meta:
        model = UserResponseChoice
        fields = '__all__'