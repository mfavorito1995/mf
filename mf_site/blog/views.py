from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Blog app")

def gallery(request):
    return HttpResponse("Blog gallery - everything I've written")
