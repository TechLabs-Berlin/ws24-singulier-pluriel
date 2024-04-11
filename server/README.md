# App Setup

## Client


## Server

Requirements
- Visual Studio Code (or a similar editor)
- node.js
- MongoDB (for local DB usage)


### Start server locally
* Clone github repository: [https://github.com/TechLabs-Berlin/ws24-singulier-pluriel.git](https://github.com/TechLabs-Berlin/ws24-singulier-pluriel.git)
* From VSC, navigate to the 'server' folder and run the command "npm install" to download the dependencies
* Create a .env file on the same level of the server.js file with the following fields: 
    - SECRET=secret
    - DB_URL=mongodb://localhost:27017/singulier-pluriel [or ask Mongo Atlas server URL to BE techie]
    - CLOUDINARY_CLOUD_NAME=[ask creds to BE techie]
    - CLOUDINARY_KEY=[ask creds to BE techie]
    - CLOUDINARY_SECRET=[ask creds to BE techie]

    > Please note that the Cloudinary credentials are needed also to run the server locally, as there is no local file storage handler.

* Run the server:
    - Navigate to the 'server' folder
    - Run command 'node server.js' or 'nodemon server.js'


### Deployed server
The Express API was deployed online using [Render](https://render.com/). The version deployed includes all changes merged to 'main'. This is the API version that serves the client:
* Render: [https://ws24-singulier-pluriel.onrender.com](https://ws24-singulier-pluriel.onrender.com)
* Express API Documentation: [https://documenter.getpostman.com/view/32234784/2sA358eko7](https://documenter.getpostman.com/view/32234784/2sA358eko7)

 
### Seed DB script
In the server folder, a 'seed/v3' folder includes data/materials and a script to populate the DB.
- fakeFiles/ = contains some files (for course covers and materials) that will be imported on a random basis via script.
- 'new_seed.js' = contains two scripts to run **separately**:
    1) seedDB() = will empty all collections and re-seed them with from scratch with the provided data (to be run first).
    2) activateUsers() = will simulate the 'account activation' of a user created by the 'University Admin'. It will save and store the user's credentials for the next logins.
    The script must be run twice separately, once to run the seedDB() function only and a second time to run the activateUsers() function. 
- 'newcourses.js', 'newlessons.js', 'users.js' = contain miscellaneous data in JSON objects/simple arrays that are used and combined via the script to populate the DB.