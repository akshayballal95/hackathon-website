Here's a detailed README for the Support in The Hague website:
# Support in The Hague - Red Cross Information Portal

A web application built with Svelte and TypeScript that provides easy access to support services for undocumented people in The Hague. The website focuses on delivering critical information quickly and efficiently.

<img src = "public/project_logo.png">

## Key Features

### 1. Quick Access to Information
Intuitive category-based navigation system that helps users quickly find essential services and support information.

### 2. Emergency Information Priority
Critical emergency contact numbers and services are prominently displayed at the top of the website for immediate access.

### 3. Smart Search Functionality
Real-time search feature that instantly filters through all resources and categories as users type their queries.

### 4. AI-Powered Chat Support
Interactive chatbot that provides immediate responses to complex questions about available services and support.

### 5. Content Management System Integration
Seamless integration with Sanity.io CMS allowing real-time content updates and management by administrators.

## Technical Stack

- **Frontend**: Svelte + TypeScript
- **Routing**: svelte-routing
- **Styling**: CSS3 with responsive design
- **CMS**: Sanity.io
- **Deployment**: Vercel
- **Chat Backend**: FastAPI

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
VITE_SANITY_TOKEN=your_sanity_token
```

4. Run development server:
```bash
npm run dev
```

## Deployment

The application is configured for deployment on Vercel with the following settings:

```json:vercel.json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## Content Management

Content is managed through Sanity.io CMS. The content structure includes:
- Categories
- Resources
- Emergency Contacts
- Service Providers
- Operating Hours
- Contact Information

```
This README provides a comprehensive overview of the website's features and technical implementation while referencing specific code sections where relevant.