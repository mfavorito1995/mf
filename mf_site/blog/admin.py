from django.contrib import admin

from .models import Blog, Place, Music, Category

admin.site.register(Blog)
admin.site.register(Category)
admin.site.register(Place)
admin.site.register(Music)
