# Personal Portfolio Website

A modern, responsive portfolio website built with Django and modern web technologies. View the live site at [mlamincreates.com](https://mlamincreates.com).

## Features

- 🎨 Modern and responsive design
- 💼 Project showcase with detailed case studies
- 🔧 Skills and expertise visualization
- 📱 Mobile-first approach
- 🚀 Performance optimized
- 🔒 Secure contact form
- ✨ Smooth animations and transitions

## Tech Stack

- **Backend**: Django 5.1
- **Frontend**: HTML5, CSS3, JavaScript
- **Database**: PostgreSQL
- **Deployment**: Heroku
- **Static Files**: WhiteNoise
- **Security**: HTTPS, HSTS enabled
- **Email**: SMTP integration

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mlamin1/PersonalWebsite.git
   cd PersonalWebsite
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv myenv
   source myenv/bin/activate  # On Windows: myenv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file:
   - Copy `.env.example` to `.env`
   - Fill in your environment variables

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

Visit `http://localhost:8000` to see the site.

## Deployment

The site is configured for deployment on Heroku:

1. Create a new Heroku app
2. Set up environment variables in Heroku Config Vars
3. Deploy using:
   ```bash
   git push heroku main
   ```

## Project Structure

```
PersonalWebsite/
├── personal_website/    # Project settings
├── main/               # Main application
│   ├── static/        # Static files (CSS, JS)
│   ├── templates/     # HTML templates
│   └── views.py       # View controllers
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Features in Development

- [ ] Blog section for technical writing
- [ ] Dynamic project management system
- [ ] Dark mode toggle
- [ ] Newsletter subscription
- [ ] Project filtering capabilities

## Contributing

While this is a personal portfolio site, suggestions and feedback are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Muniru Lamin - [laminmuniru@yahoo.com](mailto:laminmuniru@yahoo.com)

Project Link: [https://github.com/mlamin1/PersonalWebsite](https://github.com/mlamin1/PersonalWebsite) 