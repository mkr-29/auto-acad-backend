# Auto-Acad Backend

This is the backend repository for the Auto-Acad project, a comprehensive academic automation system. The frontend code can be found at [auto-acad](https://github.com/mkr-29/auto-acad).

## Tech Stack

### Core Technologies
- Node.js - JavaScript runtime environment
- Express.js - Web application framework
- MongoDB - NoSQL database
- Mongoose - MongoDB object modeling tool

### Authentication & Security
- JWT (JSON Web Tokens) - For secure authentication
- bcrypt - For password hashing
- cookie-parser - For handling cookies
- CORS - For handling cross-origin requests

### Development Tools
- Nodemon - For development auto-reloading
- dotenv - For environment variable management
- Joi - For request validation

### Communication
- EmailJS - For email functionality
- UUID - For generating unique identifiers

## Project Structure

```
auto-acad-backend/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── server.js       # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- MongoDB installed and running
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/auto-acad-backend.git
cd auto-acad-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development server:
```bash
npm run dev
```

## API Documentation

The API documentation will be available at `/api-docs` when the server is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [Auto-Acad Frontend](https://github.com/mkr-29/auto-acad) - The frontend repository for this project