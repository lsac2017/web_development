# Lifewood Frontend - React Application

Professional React frontend for the Lifewood website built with Create React App.

## Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend server running on http://localhost:8080

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will open at http://localhost:3000

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation header
│   └── Footer.jsx      # Site footer
├── pages/              # Page components
│   ├── Home.jsx        # Homepage with hero section
│   ├── About.jsx       # About Us page
│   ├── Projects.jsx    # Projects showcase
│   ├── Register.jsx    # Application form
│   ├── Login.jsx       # Admin login
│   └── AdminDashboard.jsx # Admin CRUD interface
├── services/           # API integration
│   └── api.js         # Axios API client
├── constants/          # App constants
│   └── colors.js      # Lifewood brand colors
└── App.js             # Main app with routing
```

## Features

### 🎨 **Lifewood Branding**
- **Colors**: Paper (#F5EEDB), Castleton Green (#046241), Saffron (#FFB347)
- **Typography**: Display, Headlines, Body with 2:1 ratio
- **Responsive**: Desktop, tablet, mobile optimized

### 📱 **Pages & Functionality**

**Homepage**
- Hero section with company introduction
- Features showcase
- Impact statistics
- Prominent Apply/Register CTA

**About Us**
- Mission and vision statements
- Core values with icons
- Global contribution metrics
- Team culture highlights

**Projects**
- Dynamic project cards from API
- Project descriptions and icons
- Direct application links
- Responsive grid layout

**Registration Form**
- Complete applicant data collection
- Real-time validation
- Project selection dropdown
- Backend integration

**Admin Login**
- Secure authentication
- Demo credentials provided
- Token-based session management
- Dashboard redirect

**Admin Dashboard**
- Full CRUD operations for applicants
- Search and filter functionality
- Responsive data table
- Modal forms for add/edit

### 🔧 **Technical Features**

- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Responsive Design**: CSS-in-JS with media queries
- **Form Validation**: Client-side validation with error handling
- **State Management**: React hooks (useState, useEffect)
- **Authentication**: Token-based admin authentication
- **Error Handling**: User-friendly error messages

## API Integration

The frontend connects to the Spring Boot backend at `http://localhost:8080/api`

**Endpoints Used:**
- `GET /applicants` - Fetch all applicants
- `POST /applicants` - Create new applicant
- `PUT /applicants/{id}` - Update applicant
- `DELETE /applicants/{id}` - Delete applicant
- `POST /admin/login` - Admin authentication
- `GET /projects` - Fetch available projects

## Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## Admin Access

**Demo Credentials:**
- Email: admin@lifewood.com
- Password: admin123

## Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## Color Palette

```javascript
PAPER: '#F5EEDB'           // Backgrounds
WHITE: '#FFFFFF'           // Neutral sections
SEA_SALT: '#F9F7F7'        // Light backgrounds
DARK_SERPENT: '#133020'    // Primary text
CASTLETON_GREEN: '#046241' // Buttons, accents
SAFFRON: '#FFB347'         // CTA highlights
EARTH_YELLOW: '#FFC370'    // Secondary highlights
```

## Development Notes

- All components use `.jsx` extensions
- Inline styling with CSS-in-JS approach
- No external CSS frameworks (as requested)
- Consistent Lifewood branding throughout
- Accessible design with proper contrast ratios

## Deployment

```bash
# Build for production
npm run build

# The build folder contains optimized static files
# Deploy to any static hosting service
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

**Common Issues:**

1. **API Connection Error**
   - Ensure backend is running on port 8080
   - Check CORS configuration in backend

2. **Login Issues**
   - Use demo credentials: admin@lifewood.com / admin123
   - Clear localStorage if needed

3. **Build Errors**
   - Run `npm install` to ensure dependencies
   - Check Node.js version (16+ required)

## Next Steps

1. Start the backend server (port 8080)
2. Run `npm start` for the frontend (port 3000)
3. Test the complete application flow
4. Deploy both frontend and backend to production

The application is fully functional with all required pages, responsive design, and complete backend integration!

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
