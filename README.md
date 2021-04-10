# photos-service

This service renders the interactive photo grid element for the AirBnb clone app.<br>

# Install app
Clone the repo and from the root folder of the project run thge below command:<br>
npm install<br>

# DB seed
Create .env file in root of the project with below structure and replace values as per your AWS account:<br>
<br>
AWS_ACCESS_KEY_ID=<placeholder><br>
AWS_SECRET_ACCESS_KEY=<placeholder><br>
AWS_REGION=<placeholder><br>
AWS_BUCKET_NAME=<placeholder><br>

Then, from command line from the root directory (for the .env file to be recognized):<br>
npm run seed<br>

This will create 5 photos for each room => 500 entries in DB and S3 bucket => ~ 5-10 minutes execution time<br>

# run the service
npm start<br>

# photos-service API
[photos-service API] (server/README.md)