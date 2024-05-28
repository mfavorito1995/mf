import datetime
import random
import os
import shutil

from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.conf import settings

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    def __repr__(self):
        return self.__str__()

class PostType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    def __repr__(self):
        return self.__str__()
    

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
    
    def __repr__(self):
        return self.__str__()


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
    
    def __repr__(self):
        return self.__str__()


def blog_content_file_path(instance, filename):
    # Generate the upload path for the content file
    _, filename = os.path.split(filename)
    return os.path.join('blog_content', f"{instance.publish_date.strftime('%Y-%m-%d')}_{slugify(instance.title)}", 'doc', filename)

def blog_gallery_image_path(instance, filename):
    # Generate the upload path for the gallery image
    _, filename = os.path.split(filename)
    return os.path.join('blog_content', f"{instance.publish_date.strftime('%Y-%m-%d')}_{slugify(instance.title)}", 'img', filename)


class Blog(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    publish_date = models.DateTimeField(auto_now_add=True)
    content_file = models.FileField(upload_to=blog_content_file_path, null=True, blank=True)
    gallery_image = models.FileField(upload_to=blog_gallery_image_path, null=True, blank=True)
    post_type = models.ManyToManyField(PostType)
    category = models.ManyToManyField(Category)
    music = models.ForeignKey(Music, on_delete=models.CASCADE, related_name='blogs', null=True, blank=True)
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='blogs', null=True, blank=True)
    date_when = models.DateField(null=True)

    def save(self, *args, **kwargs):
        if self.pk:
            # If the object is being updated, check if the title has changed
            old_instance = Blog.objects.get(pk=self.pk)
            if self.title != old_instance.title:
                
                # If the title has changed, update the file paths
                old_content_path = old_instance.content_file.path if old_instance.content_file else None
                old_gallery_path = old_instance.gallery_image.path if old_instance.gallery_image else None
                
                self.content_file = blog_content_file_path(self, self.content_file.name)
                self.gallery_image = blog_gallery_image_path(self, self.gallery_image.name)
                
                # Move the files to the new paths
                new_content_path = os.path.join(settings.BASE_DIR, self.content_file.name)
                os.makedirs(os.path.dirname(new_content_path), exist_ok=True)
                shutil.move(old_content_path, new_content_path)
                
                new_gallery_path = os.path.join(settings.BASE_DIR, self.gallery_image.name)
                os.makedirs(os.path.dirname(new_gallery_path), exist_ok=True)
                shutil.move(old_gallery_path, new_gallery_path)

                # Delete old folders
                os.rmdir(os.path.dirname(old_content_path))
                os.rmdir(os.path.dirname(old_gallery_path))
                old_title_folder = os.path.join(settings.BASE_DIR, os.path.join('blog_content', f"{old_instance.publish_date.strftime('%Y-%m-%d')}_{slugify(old_instance.title)}"))
                os.rmdir(old_title_folder)
        
            # Check if either path is different
            elif self.content_file != old_instance.content_file:

                print('NEW CONTENT!')

            elif self.gallery_image != old_instance.gallery_image:

                print('NEW IMAGE!')



        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
    @property
    def get_full_gallery_image_url(self):
        if self.gallery_image:
            return os.path.join(settings.BASE_DIR, self.gallery_image.url)
        else:
            return None
    
    @property
    def published_past_week(self):
        return self.publish_date >= timezone.now() - datetime.timedelta(days=7)
    
    @property
    def display_date(self):
        if not self.date_when:
            return self.publish_date.date()
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
