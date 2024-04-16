<p align="center">
  <img src="./UX/Blogpost_Images/img_1.png" width=60%>
</p>

<p align="center">_______________</p>

# <p align="center">SingulierPluriel LMS</p>

<p align="center">

<p align="center">

[About](#about)  |  [Folder Structure](#Folder-Structure)  |  [App Setup](#App-Setup)  |  [Figma High-Fidelity Prototype](#Figma)  |  [Authors](#authors)

</p>


<a id="about"></a>

## About
**SingulierPluriel LMS** is a learning management system for universities and adult education settings, designed to be accessible, intuitive, and easy to navigate. Main features include:

- Share learning materials with your students by creating and editing course modules;
- Graphical dashboards: the LMS allows you to always have crucial data like student attendance, student feedback, and grade distribution at your fingertips, in the form of graphics and visual representations.

<a id="Folder-Structure"></a>

## Folder Structure
**WD**

- Attendance Distribution (course level)/
- Example Flask Integration Attendance Feature (course level)/
- Feedback Distribution (course level)/
- FlaskStudentStatistics/
- Grade Distribution (course level)/
- NotebooksStudentStatistics/
- Performance Prediction (ML)/
- Student Feedback prediction (ML)/

**UX**

- 1.Research/
- 2.Analysis/
- 3.Prototype/
- 4.User_Testing/
- Blogpost_Images/

**app**

<ul>
  <li>client/</li>
  <ul>
    <li>public/</li>
    <li>src/</li>
  </ul>
  <li>screenshots/</li>
  <li>server/</li>
  <ul>
    <li>cloudinary/</li>
    <li>controllers/</li>
    <li>db/</li>
    <li>routes/</li>
    <li>seed/v3/</li>
  </ul>
</ul>



<a id="App-Setup"></a>

## App Setup

## Client - React App
### Clone the repository
`git clone https://github.com/TechLabs-Berlin/ws24-singulier-pluriel.git`

### Navigate to client directory
`cd app/client`

### Install dependencies
`npm install`<br>
The 'npm install' installs all modules that are listed on package.json file and their dependencies.

### Start the application
`npm start`<br>
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Credentials for login
You can log in with different roles (teacher/student) using the credentials:
- Students:
    - kenzie.morse@email.com,
    - arya.holloway@email.com,
    - laney.quintero@email.com,
    - meredith.benjamin@email.com
- Teachers:
    - delaney.fletcher@email.com,
    - helena.yu@email.com,
    - callum.tyler@email.com

<p>Password is 'test'.</p>

## Server
**Requirements**
- Visual Studio Code (or a similar editor)
- node.js
- MongoDB (for local DB usage)


### Start server locally
* Clone github repository: `git clone https://github.com/TechLabs-Berlin/ws24-singulier-pluriel.git`;
* From VSC, navigate to the 'server' folder (`cd app/server`) and run the command `npm install` to download the dependencies;
* Create a .env file on the same level of the server.js file with the following fields: 
    - `SECRET=secret`
    - `DB_URL=mongodb://localhost:27017/singulier-pluriel` [or ask Mongo Atlas server URL to BE techie]
    - `CLOUDINARY_CLOUD_NAME=`[ask creds to BE techie]
    - `CLOUDINARY_KEY=`[ask creds to BE techie]
    - `CLOUDINARY_SECRET=`[ask creds to BE techie]
    
    > Please note that the Cloudinary credentials are needed to run the server locally, as there is no local file storage handler.

* Run the server:
    - Navigate to the 'server' folder
    - Run command `node server.js` or `nodemon server.js`


### Deployed server
The Express API was deployed online using [Render](https://render.com/). The version deployed includes all changes merged to 'main'. This is the API version that serves the client:
* Render: [https://ws24-singulier-pluriel.onrender.com](https://ws24-singulier-pluriel.onrender.com)
* Express API Documentation: [https://documenter.getpostman.com/view/322

<a id="Figma"></a>

## Figma High-Fidelity Prototype

Our high-fidelity prototype - complete with sections that are not yet available in the app - can be found [here](https://www.figma.com/proto/dfZykUktjrsipShxE2xHRv/Screwaround-File?type=design&node-id=1162-1904&t=eArMoH8ZFlA4ilZs-1&scaling=scale-down&page-id=1153%3A1903&starting-point-node-id=1162%3A1904&hotspot-hints=0&mode=design).

<a id="authors"></a>

## Authors
This project was created by:

* User Experience: Giorgio Chiappa
* Data Science: Leila Kulik
* Data Science: Lucas Winterfeld
* Wed Developer (FE): Magdalena Olkiewicz 
* Wed Developer (FE): Malalai Safi
* Wed Developer (FE): Dewa Baedaar
* Wed Developer (BE): Nicol Tincani
  
Mentor: Matheus Albuquerque
