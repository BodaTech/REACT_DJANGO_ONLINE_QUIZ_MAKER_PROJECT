from django.db import models
from user.models import User


class Quiz(models.Model):
    
    class Status(models.TextChoices):
        pending = 'pending', 'Pending'
        in_progress = 'in progress', 'In Progress'
        completed = 'completed', 'Completed'
        canceled = 'canceled', 'Canceled'

    title = models.CharField(max_length=14)
    code = models.CharField(max_length=12, unique=True)
    status = models.CharField(
        choices=Status.choices,
        default=Status.pending,
        max_length=20
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        User,
        related_name='quizzes',
        on_delete=models.CASCADE,
    )
    class Meta:
        db_table = 'quizzes'
        verbose_name = 'quiz'
        verbose_name_plural = 'quizzes'


class Participation(models.Model):
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name='participations'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='participations'
    )
    score = models.FloatField(null=True, blank=True, default=0)

    class Meta:
        db_table = 'participations'
        verbose_name = 'participation'
        verbose_name_plural = 'participations'

