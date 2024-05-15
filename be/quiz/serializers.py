from rest_framework.serializers import ModelSerializer
from quiz.models import Quiz, Participation
from question.serializers import QuestionSerializer
from user.serializers import UserSerializer, UserNameSerializer


class ParticipationSerializer(ModelSerializer):
    class Meta:
        model = Participation
        fields = '__all__'


class ParticipationDetailSerializer(ModelSerializer):
    user = UserNameSerializer()
    class Meta:
        model = Participation
        fields = '__all__'


class QuizSerializer(ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    participations = ParticipationDetailSerializer(many=True, read_only=True)
    user = UserSerializer()

    class Meta:
        model = Quiz
        fields = '__all__'


class QuizCUSerializer(ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

