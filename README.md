<<<<<<< HEAD
# Portfolio Website

This repository contains the source code for a personal portfolio website. The site showcases various sections including Home, About Me, Services, CV, Gallery, and Contact Me. It uses SwiperJS for a cube effect on the main slides, NodeJS for handling email functionality, and PM2 to keep the mailing service active.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Usage](#usage)
5. [File Structure](#file-structure)
6. [License](#license)
7. [Contact](#contact)

## Features

- **SwiperJS Cube Effect**: A cube transition effect is used for the main swiper to provide an engaging user experience.
- **Responsive Design**: Ensures that the portfolio is viewable on devices of all sizes.
- **Contact Form**: Allows users to send messages directly through the site, using NodeJS and Nodemailer.
- **Gallery**: Displays a set of projects with a slider navigation.
- **PM2**: Keeps the NodeJS server running for handling email submissions.

## Technologies Used

- **HTML/CSS/JavaScript**: For the front-end development.
- **SwiperJS**: For the cube effect on the main slides.
- **NodeJS**: For the backend server handling the contact form submissions.
- **Nodemailer**: For sending emails via the contact form.
- **PM2**: For keeping the NodeJS server running continuously.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- A Gmail account for sending emails via Nodemailer.
- PM2 installed globally (optional but recommended for production use).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/raigoh/Swiper-Portfolio.git
   cd Swiper-Portfolio
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your email credentials:

   ```env
   EMAIL=your-email@gmail.com
   PASSWORD=your-email-password
   PORT=3000
   ```

4. **Run the server:**

   ```bash
   node sendMail.js
   ```

5. **For keeping the server running with PM2:**

   ```bash
   pm2 start sendMail.js
   ```

## Usage

### Navigating the Website

- Use the sidebar or mousewheel scroll-down to navigate between different sections: Home, About Me, Services, CV, Gallery, and Contact Me.
- The main content transitions with a cube effect powered by SwiperJS.

### Contact Form

- Fill in your name, email, and message.
- On submission, the form data is sent to the backend server, which then uses Nodemailer to send an email to the specified address.

### Gallery Navigation

- Navigate through gallery images using the previous and next buttons.

## File Structure

```bash
Swiper-Portfolio/
│
├── public/
│   ├── pdf/
│   └── index.html
│
├── static/
│   ├── css/
│   ├── images/
│   └── javascript/
│
└── README.md
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

- **Raigo Hoim**
- **Email**: [vikationu@gmail.com](mailto:vikationu@gmail.com)
- **LinkedIn**: [Raigo Hoim](https://www.linkedin.com/in/raigo-hoim/)
- **Facebook**: [Raigo Hoim](https://www.facebook.com/raigo.hoim/)
=======

>>>>>>> 98ed630f269d558cc4025d1d56abd5c716c71958
