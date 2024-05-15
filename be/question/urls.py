from django.urls import path
from question.views import UserResponseView

urlpatterns = {
    path('<int:question_id>/answer', UserResponseView.as_view(), name='user_response')
}