# <p align="center">Language Management System<br>Singulier Pluriel</p>

<h5 align="center">
  <a href="#About">About</a>  |
  <a href="#Solution">Solution</a>  |
  <a href="#UX">UX</a>  |
  <a href="#Web Development">Web Development</a>  |
  <a href="#DS">DS</a>  |
  <a href="#NextSteps">NextSteps</a>  |
</h5>

## About


## Solution


## UX



## Web Development
We developed a dynamic Web App complete with client-server configuration and main CRUD operations. The frontend is organized into pages and components, along with other main app files.

**Key Features (Operational):**
- Login page
- Main dashboard
- Help center ('?')
- Courses page (fetching user courses from the backend)
- Detailed course page (accessible from course cards) with modules and course materials (data sourced from the backend)
- Module functionalities: Add, Edit, Delete Module; Delete course materials; Upload/Download options
- Logout capability

**User Roles:**
- Distinct roles for course instructors and students, with components conditionally rendered based on the user's role.

**Tools and Resources:**
- **Demo Video:** Available on [Loom](https://www.loom.com/share/5e36b0dedfca4ed7a3950646202ac521?sid=cc489221-9c77-4ae2-a61d-1042a4ddc5b1).
- **Project Management:** Our team used Trello for task management, accessible [here](https://trello.com/b/MuXdeIPG/singulierpluriel-lms).
- **Board:** Check our Miro board [here](https://miro.com/app/board/uXjVNrj3AzQ=/).
- **Tech Stack:** The app was built using HTML, CSS, JavaScript, React, Chakra UI, Node.js, Express, MongoDB, Render, and Cloudinary.
- **Documentation:** A detailed list of libraries and technologies used is available [here](https://docs.google.com/document/d/1h4APpcQqYx4kJHqJv2mmVjjXRcIP-ceMvADlGp6LJng/edit#heading=h.g7bk7pcwop6a).

**Features which are currently in demo phase:**
- Search bar
- Announcements on the main page
- Communication
- Grade Center
- On specific course pages - buttons: Add Link, Add Multimedia, Check/Edit Assignments.


### Backend
The Singulier-Pluriel App is served by a RESTful backend developed with Node.js and Express framework. The server is connected to the database managed in MongoDB Atlas via mongoose. For image/file uploads the online storage Cloudinary has been configured and connected to the server as well as the DB to upload/delete cloud-stored files accordingly.


#### Server/API - Node.js and Express
The "server.js" file contains the main code to start the server. The functions of the endpoints are to be found in the "controllers" folder and are then imported accordingly to the specific routes (in the "routes" folder) referenced in the main code.
The "middleware.js" and "utils.js" files contain other helper functions and perform specific actions, some of them "functional" (see "middleware.js"), like checking if the user is logged in or has a certain role, others with more of a "technical" purpose (see "utils.js", to remove repetition of try & catch method in async functions).

> Express API documentation: [https://documenter.getpostman.com/view/32234784/2sA358eko7](https://documenter.getpostman.com/view/32234784/2sA358eko7)

> **Note on endpoints**: Due to changes of plan and reprioritization according to the FE techies' availabilities, some endpoints are not actively used in the delivered version of the app. See for example "Activate account", "Get course students", "Create course", "Toggle publish course".

In order to make the work of BE & FE more flexible, the server has been deployed online on [Render](https://render.com/) at the URL [https://ws24-singulier-pluriel.onrender.com](https://ws24-singulier-pluriel.onrender.com).

![Server on Render](screenshots/Render_API.png)

> **Note on Render**: Due to the limitation of the free tier, the server might take some time to process requests after a longer periods of inactivity. The processing time will improve with usage. 


#### Database - MongoDB Atlas, mongoose and DB models
The server is connected to MongoDB Atlas as a tool to store the app data according to the schemas/models that can be found in the 'db' folder. The content has been populated programmatically via the DB seeding script.

![Populated DB](screenshots/DB.png)

The main collections/models (roles, users, courses, lessons) present both One-to-One and One-to-Many relationships (with embedded documents and document reference).

![Populated DB](screenshots/DB.png)
![DB - Users](screenshots/DB_users.png)
![DB - Lessons and Materials](screenshots/DB_lessons_mats.png)

The "courses" collection presents a category called "stats" that holds (randomly generated) data based on the DS goals on how to represent students-related data/participation/feedback in graphical dashboards. This data was included in the app for future purposes, but it is currently not actively used in the app.

![DB - Courses](screenshots/DB_courses.png)

The additional collection "sessions" will be created and used to store the users' session information. This way the server can 'locate' the origin of the request and retrieve the data related to the currently logged in user.

![DB - Sessions](screenshots/DB_sessions.png)

The database connection is created separately in the 'dbConnect.js' file, which is then imported and run directly in the 'server.js' file.


##### DB seeding
The 'seed' folder contains data on users, courses, modules and files that will be programmatically (see 'new_seed.js') combined together to create new DB documents and accordingly feed the specific collections. The script first wipes the database clean, then feeds the collections from scratch.


#### Cloud Storage - Cloudinary
Cloudinary was chosen as cloud storage for collecting course covers and any material uploaded to a specific module. The accepted formats are image files (jpg, jpeg, png) and PDF. MS Office files and any other text files are not supported without additional plug-ins.
The file upload/deletion is made possible with the combination of the 'cloudinary' library and a middleware from the 'multer' library, which performs the upload to a specific Cloudinary folder ('singulier-pluriel'). Key information of the file request object (filename, url) made available by 'multer' is stored in the specific category of the corresponding DB document.

![Cloudinary storage](screenshots/Cloudinary.png)
![DB and Cloudinary](screenshots/DB_Cloudinary.png)



## DS





## Next Steps
* Work on other pages/features (for ex., add course announcements and grades center to dashboard, add a more interactive Help function, add assignments to modules)
* Implementing live data tracking for seamless integration with the DS data/models + stats update
* Implementing in-app notifications (for announcements and for reminders)
* Improve students' experience (for ex. add exam booking, enhance interaction with modules and materials)


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