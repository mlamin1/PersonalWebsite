from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Project
from .forms import ContactForm
import json

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

def project_detail(request, id):
    project = get_object_or_404(Project, id=id)

    technologies = project.technologies.split(',') if project.technologies else []

    context = {
        'project': project,
        'technologies': technologies,
    }
    return render(request, 'main/project_detail.html', context)

@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
def contact(request):
    if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        try:
            data = json.loads(request.body)
            form = ContactForm(data)
            print("Received POST request:", data)  # Debug print
            print("Form is valid:", form.is_valid())  # Debug print
            if not form.is_valid():
                print("Form errors:", form.errors)  # Debug print
            
            if form.is_valid():
                try:
                    # Get form data
                    name = form.cleaned_data['name']
                    email = form.cleaned_data['email']
                    purpose = form.cleaned_data['purpose']
                    message = form.cleaned_data['message']
                    
                    # Prepare email content
                    subject = f'New Contact Form Submission: {purpose}'
                    email_message = f"""
                    Name: {name}
                    Email: {email}
                    Purpose: {purpose}
                    
                    Message:
                    {message}
                    """
                    
                    # Send email
                    send_mail(
                        subject=subject,
                        message=email_message,
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[settings.CONTACT_EMAIL],
                        fail_silently=False,
                    )
                    
                    print("Email sent successfully")  # Debug print
                    return JsonResponse({
                        'status': 'success',
                        'message': 'Your message has been sent successfully!'
                    })
                except Exception as e:
                    print(f"Email error: {str(e)}")  # Debug print
                    return JsonResponse({
                        'status': 'error',
                        'message': f'Failed to send message: {str(e)}'
                    }, status=500)
            else:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Invalid form data. Please check your inputs.',
                    'errors': form.errors
                }, status=400)
        except json.JSONDecodeError:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid JSON data'
            }, status=400)
            
    return render(request, 'main/contact.html')
