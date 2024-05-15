from django.urls import path, include

urlpatterns = [
    path('api/v1/question/', include('question.urls')),
    path('api/v1/quiz/', include('quiz.urls')),
    path('api/v1/auth/', include('user.urls')),
]
