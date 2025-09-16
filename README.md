# Michael Fiskey Portfolio (WORK IN PROGRESS)

A fullstack web application built with Next.js, Django, and Express.js.

**Frontend:** [https://michaelfiskey.vercel.app](https://michaelfiskey.vercel.app)  

## Tech Stack

### Frontend
- **Next.js**
- **TypeScript**
- **HTML**
- **CSS**
- **Tailwind CSS**
- **GSAP**
- **Syncfusion**

### Backend
- **Django**
- **Django REST Framework**
- **Express.js**
- **PostgreSQL**
- **SpotifyWebAPI**


### Infrastructure
- **Vercel**
- **Railway**
- **Git/GitHub**

## Project Structure
```
portfolio/
├── portfolio-project/     # Next.js frontend application
├── django-backend/        # Django REST API server
├── express-backend/       # Express.js API server
└── README.md
```

## Local Installation & Setup

### Prerequisites
- Node.js 18+
- Python 3.12+
- PostgreSQL database

### Frontend Setup
```bash
cd portfolio-project
npm install
npm run dev
```

### Django Backend Setup
```bash
cd django-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Environment Variables
Create `.env` files in respective directories with:

**Django Backend:**
```
FRONTEND_URL=https://localhost:3000
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True/False
ALLOWED_HOSTS=allowed-host-1.com,allowed-host-2.com
POSTGRES_ENGINE=local.data.base.here
POSTGRES_DB=db.type
PORT=12345
```

**Express Backend:**
```
PORT=5500
ORIGIN_URL=http://localhost:3000
DATABASE_URL=your-private-database-url-for-production
DATABASE_PUBLIC_URL=your-public-database-url-for-development
SPOTIFY_CLIENT_ID=client-id
SPOTIFY_CLIENT_SECRET=secret-id
JWT_SECRET_KEY=jwt-secret-key
JWT_VERIFY_EMAIL_SECRET_KEY=verify-email-secret-key
TOKEN_HEADER_KEY=Authorization
RESEND_KEY=resend-key
EMAIL_RECEIVER=receiver-name@example.com
```

**Frontend:**
```
NEXT_PUBLIC_DJANGO_URL=https://localhost:PORT_FROM_DJANGO_ENV
NEXT_PUBLIC_EXPRESS_URL_PRODUCTION=https://localhost:PORT_FROM_EXPRESS_ENV
SYNCFUSION_KEY=syncfusion-key-here
```

## API Endpoints

### Django Backend
- `GET /api/find-schedules/` - Retrieve scheduling data
- `POST /api/contact/` - Submit contact form

### Express Backend
- `GET /api/spotify/` - Fetch Spotify integration data
- `POST /api/projects/` - Manage project data

## Development

### Testing
```bash
# Frontend tests
cd portfolio-project
npm test

# Backend tests
cd django-backend
python manage.py test
```

### Building for Production
```bash
# Frontend
npm run build

# Backend
python manage.py collectstatic
```

## Contact

**Michael Fiskey**  
[LinkedIn](https://www.linkedin.com/in/michaelfiskey/)
