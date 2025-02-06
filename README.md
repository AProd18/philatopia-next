# Stampfolio - Digital Stamp Collection Platform

Stampfolio is a web application designed for philatelists to collect, showcase, and manage their stamp collections. Built with Next.js 15, Prisma, and SQLite, this app allows users to register, log in, upload their stamps, and manage their profiles. It features a gallery where users can view all stamps, as well as personalized collections for logged-in users.

## Features

- **User Authentication**: Register and log in using email or Google credentials with NextAuth.
- **Stamp Management**: Add, edit, and delete stamps in your personal collection.
- **Philately Gallery**: View all stamps uploaded by users with details like name, description, year, and country.
- **Profile Page**: Customize your profile with a profile picture and "About Me" section.
- **Owner Information**: On each stamp in the gallery, users can see who uploaded the stamp, and by clicking on the owner's name, a modal will display their profile picture and "About Me" details.
- **Responsive Design**: TailwindCSS for a fully responsive design.

## Technologies Used

- **Next.js 15**: React framework for building the web application with server-side rendering (SSR) and client-side rendering (CSR).
- **Prisma ORM**: Database ORM for managing SQLite for local development.
- **SQLite**: Lightweight database for storing user and stamp data.
- **NextAuth**: Authentication solution for implementing login with Google and email.
- **TailwindCSS**: A utility-first CSS framework for building responsive and modern designs.

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for managing dependencies

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stampfolio.git
   cd stampfolio
2. Install dependencies:
   npm install
   # or
   yarn install
3. Set up environment variables:
   Create a .env file in the root of the project and configure the following variables:
   DATABASE_URL="file:./dev.db" # for SQLite (for local development)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
4. Set up the Prisma database:
   npx prisma migrate dev
5. Run the development server:
   npm run dev
   # or
   yarn dev
6. Open your browser and go to http://localhost:3000 to see the app in action.


