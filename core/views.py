from django.shortcuts import render, redirect, get_object_or_404
from .models import Text, Score
import random

def main(request):
	my_ids = Text.objects.all().values_list('id', flat=True)
	my_id = random.choice(my_ids)
	text = get_object_or_404(Text, id=my_id)
	context = {'text': text}
	# USE USER.IS_AUTHENTICATED TAG IN TEMPLATE INSTEAD
	if request.user.is_authenticated:
		user = request.user
		user_auth = 'yes'
		stats = Score.objects.filter(user=user)
		context = {'text': text, 'user': user, 'stats': stats, 'user_auth': user_auth}

	return render(request, 'core/main.html', context)

def store_score(request):
	user = request.user
	score = request.POST.get('score-input')
	Score.objects.create(user=user, score=score)
	return redirect('main')