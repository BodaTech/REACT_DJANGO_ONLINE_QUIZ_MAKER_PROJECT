from django.urls import path
from user.views import RegisterView, TokenView, AuthView, LogoutView

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('authenticate', AuthView.as_view(), name='auth'),
    path('logout', LogoutView.as_view(), name='auth'),
    path('token/refresh', TokenView.as_view(), name='token')
]
