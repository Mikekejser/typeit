from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('admin-panel/', admin.site.urls),
    path('', include('core.urls')),
    path('login/', auth_views.LoginView, name='login'),
    path('logout/', auth_views.LogoutView, name='logout'),
    path('oauth/', include('social_django.urls', namespace='social')),
]