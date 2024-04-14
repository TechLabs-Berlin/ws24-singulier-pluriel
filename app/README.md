# App Setup

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
* Express API Documentation: [https://documenter.getpostman.com/view/32234784/2sA358eko7](https://documenter.getpostman.com/view/32234784/2sA358eko7)