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



class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    image = models.ImageField(upload_to='authors/', blank=True, null=True)

    def __str__(self):
        return self.name

class Blog(models.Model):
    title = models.CharField(max_length=200)
    excerpt = models.TextField(max_length=300)
    content = models.TextField()
    image = models.ImageField(upload_to='blogs/', blank=True, null=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    related_posts = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.title
    
    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return '/path/to/placeholder.jpg'  # Update this with the actual path to your placeholder image