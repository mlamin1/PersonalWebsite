from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about_me, name='about_me'),
    path('projects/', views.projects, name='projects'),
    path('contact/', views.contact, name='contact'),
    path('contact/submit/', views.contact, name='contact_submit'),
] 