Setup and Instructions

1. Install TypeScript - npm install -g typescript

2. Install ts-node - npm install -g ts-node

3. Install ImageMagick globally - npm install -g imagemagick

4. For windows operating system - ImageMagick have to installed and path should be there in the environment variables.
Example - 

4. Place aws.env file by renaming to .env in the folder named "backend" in our project and place firebase.env file by renaming to .env in the folder named "client" in our project.

5. Go to "backend" folder and install all the packages by running npm install

6. Go to "client" folder and install all the packages by running npm install

7. To seed the database with initial data, go to "backend" folder and run the command -  npm run seed

8. To start the application, go to "backend" folder and run the command - npm run prod
This will create the js files from ts files and then brings up both the servers.
Backend server is deployed in localhost:/4000
Frontend server is deployed in localhost:/3000



Components used in our project

1. CSS3 and bootstrap used for styling.

2. React framework used for frontend.

3. Typescript used for backend.

4. Express is the backend server.

5. Aws s3 bucket is used to store all the images uploaded.

6. Mongoose is used for data layer.

7. Imagemagick is used to convert the image size while download.

8. xss-clean and helmet libraries are used for secuarity purposes. 
