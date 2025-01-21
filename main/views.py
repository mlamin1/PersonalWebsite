from django.shortcuts import get_object_or_404, render
from .models import Project, Blog

# Create your views here.
def home(request):
    return render(request, 'main/home.html')

def about_me(request):
    return render(request, 'main/about_me.html')

def projects(request):
    projects = Project.objects.all()
    context = {
        'projects': projects,
    }
    return render(request, 'main/projects.html', context)

def blog(request):
    return render(request, 'main/blog.html')

def project_detail(request, id):
    project = get_object_or_404(Project, id=id)

    technologies = project.technologies.split(',') if project.technologies else []

    context = {
        'project': project,
        'technologies': technologies,
    }
    return render(request, 'main/project_detail.html', context)

def contact(request):
    return render(request, 'main/contact.html')

def blog_list(request):
    blogs = Blog.objects.all()
    return render(request, 'main/blog.html', {'blogs': blogs})

def blog_detail(request, id):
    blog = get_object_or_404(Blog, id=id)
    related_posts = blog.related_posts.all()
    return render(request, 'main/blog_detail.html', {'blog': blog, 'related_posts': related_posts})
