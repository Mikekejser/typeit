from django.db import models
from django.contrib.auth.models import User


class Text(models.Model):
	text = models.TextField()
	
	def __str__(self):
		return self.text


class Score(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	score = models.CharField(max_length=3)
	date = models.DateField(auto_now_add=True)

	def __str__(self):
		return f'{self.user.username} | {self.score}'
