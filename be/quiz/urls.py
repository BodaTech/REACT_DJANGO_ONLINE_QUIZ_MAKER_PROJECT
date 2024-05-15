from django.urls import path, include
from quiz.views import (QuizView, QuizParticipationView, QuizDetailsView, 
                        UserQuizView, UserResponseView, UserScoreView)

urlpatterns = [
    path('', QuizView.as_view(), name='quiz'),
    path('<int:id>', QuizDetailsView.as_view(), name='quiz_detail'),
    path('participations/<str:code>', QuizParticipationView.as_view(), name='quiz_participation'),
    path('user/all', UserQuizView.as_view(), name='user_quiz'),
    path('user/response/<int:id>', UserResponseView.as_view(), name='user_response'),
    path('user/response/<int:id>/final', UserScoreView.as_view(), name='user_response'),
]
