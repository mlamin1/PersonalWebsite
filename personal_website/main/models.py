from django.db import models

# Create your models here.

class Project(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    introduction = models.TextField()
    role = models.CharField(max_length=200)
    goals = models.TextField()
    technologies = models.CharField(max_length=500)
    challenges = models.TextField()
    solutions = models.TextField()
    hero_image = models.ImageField(upload_to='projects/', blank=True, null=True)
    gallery_images = models.JSONField(default=list, blank=True)
    features = models.JSONField(default=list, blank=True)
    testimonial = models.TextField(blank=True)
    download_link = models.FileField(upload_to='downloads/', blank=True, null=True)

    def __str__(self):
        return self.title
    
    def get_technologies_list(self):
        return self.technologies.split(',')