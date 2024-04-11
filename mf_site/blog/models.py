import datetime
import random

from django.db import models
from django.utils import timezone

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class Music(models.Model):
    id = models.AutoField(primary_key=True)
    song=models.CharField(max_length=255)
    artist=models.CharField(max_length=255)
    album=models.CharField(max_length=255)

    @property
    def full_name(self):
        
        parts = [self.song, self.artist, self.album]
        valid_parts = [p for p in parts if p]
        return ", ".join(valid_parts)
    
    def __str__(self):
        return self.full_name

class Place(models.Model):
    id = models.AutoField(primary_key=True)
    place_name=models.CharField(max_length=255, default=None)
    place_address=models.CharField(max_length=255, default=None, null=True)
    place_city=models.CharField(max_length=255, default=None, null=True)
    place_state=models.CharField(max_length=255, default=None, null=True)
    place_country=models.CharField(max_length=255, default=None, null=True)
    place_lat=models.DecimalField(max_digits=9, decimal_places=6)
    place_long=models.DecimalField(max_digits=9, decimal_places=6)

    @property
    def full_name(self):
        
        parts = [self.place_name, self.place_address, self.place_city, self.place_state, self.place_country]
        valid_parts = [p for p in parts if p]
        return ", ".join(valid_parts)
    
    def __str__(self):
        if self.place_lat and self.place_long:
            return f"{self.full_name}, {self.place_lat}, {self.place_long}"
        else:
            return self.full_name


class Blog(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    publish_date = models.DateTimeField(auto_now_add=True)
    content_file = models.FileField(upload_to='blog_content')
    category = models.ManyToManyField(Category)
    music = models.ForeignKey(Music, on_delete=models.CASCADE, related_name='blogs', null=True, blank=True)
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='blogs', null=True, blank=True)
    date_when = models.DateField(null=True)

    def __str__(self):
        return self.title
    
    @property
    def published_past_week(self):
        return self.publish_date >= timezone.now() - datetime.timedelta(days=7)
    
    @property
    def display_date(self):
        if not self.date_when:
            return self.publish_date.date
        return self.date_when

    @property
    def next_blog(self):
        # take a date, get the next in order?
        all_blogs = [x.id for x in Blog.objects.order_by("publish_date")]
        curr_index = all_blogs.index(self.id)
        if self.id != max(all_blogs):
            new_index = curr_index + 1
            return all_blogs[new_index]
        else:
            return all_blogs[0] 

    @property
    def prev_blog(self):
        # take a date, get the next in order?
        all_blogs = [x.id for x in Blog.objects.order_by("publish_date")]
        curr_index = all_blogs.index(self.id)
        if self.id != min(all_blogs):
            new_index = curr_index - 1
            return all_blogs[new_index]
        else:
            return all_blogs[-1]
    
    @property
    def random_other_blog(self):
        # take a date, get the next in order?
        all_blogs = [x.id for x in Blog.objects.all() if x.id != self.id]
        return random.choice(all_blogs)
