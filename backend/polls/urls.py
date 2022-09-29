from django.urls import path
from polls import views

urlpatterns = [
    path("give-poll/", views.PollByUserAPI.as_view()),
    path("poll-result/<int:poll_id>/", views.PollByUserAPI.as_view()),
    path("polls/<int:poll_id>/", views.PollAPI.as_view()),
    path("polls/", views.PollAPI.as_view()),
    path("corrupt/", views.CorrupBlockchainAPI.as_view()),
]
