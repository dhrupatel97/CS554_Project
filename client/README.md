Setup and Instructions

1. Install TypeScript - npm install -g typescript

2. Install ts-node - npm install -g ts-node

3. Install ImageMagick globally - npm install -g imagemagick

4. For windows operating system - ImageMagick has to be downloaded and installed from - https://imagemagick.org/script/download.php . The absolute path should be updated in the PATH environment variable. Also make sure convert.exe and identify.exe files exist in the installed directory.

5. Place aws.env file by renaming to .env in the folder named "backend" and place firebase.env file by renaming to .env in the folder named "client".

6. Navigate to "backend" folder and install all the packages by running npm install

7. Navigate to "client" folder and install all the packages by running npm install

8. To seed the database, navigate to the "backend" folder and run the command - npm run seed

9. Make sure you have MongoDB Database Tools installed and the installed path set to the PATH environment variable for running windows.

10. To start the application, navigate to "backend" folder and run the command - npm run prod
This will create the js files from ts files and then brings up both the servers(Backend and Frontend)
Backend server is deployed in localhost:/4000
Frontend server is deployed in localhost:/3000



Components used in our project

1. CSS3 and bootstrap used for styling.

2. React framework used for frontend.

3. Typescript used for backend.

4. Express is the backend server.

5. AWS s3 bucket is used to store all the images uploaded.

6. Mongoose is used for data layer.

7. Imagemagick is used to convert the image size while download.

8. xss-clean and helmet libraries are used for security purposes. 
