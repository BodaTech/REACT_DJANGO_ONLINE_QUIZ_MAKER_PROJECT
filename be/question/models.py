from django.db import models
from user.models import User
from quiz.models import Quiz, Participation


class Question(models.Model):
    question_text = models.TextField()
    duration = models.IntegerField(default=60)
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name='questions'
    )

    class Meta:
        db_table = 'questions'
        verbose_name = 'question'
        verbose_name_plural = 'questions'


class Response(models.Model):
    response_text = models.TextField()
    explanation = models.TextField(blank=True, null=True)
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='responses'
    )
    is_correct = models.BooleanField()
    class Meta:
        db_table = 'responses'
        verbose_name = 'response'
        verbose_name_plural = 'responses'


class UserResponse(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='user_responses'
    )
    participation = models.ForeignKey(
        Participation,
        on_delete=models.CASCADE,
        related_name='user_responses'
    )
    score = models.FloatField(null=True, blank=True, default=0)

    class Meta:
        db_table = 'user_responses'
        verbose_name = 'user_response'
        verbose_name_plural = 'user_responses'


class UserResponseChoice(models.Model):
    user_response = models.ForeignKey(
        UserResponse,
        on_delete=models.CASCADE,
        related_name='user_response_choices'
    )
    response = models.ForeignKey(
        Response,
        on_delete=models.CASCADE
    )

    class Meta:
        db_table = 'user_response_choices'
        verbose_name = 'user_response_choice'
        verbose_name_plural = 'user_response_choices'

