# photos-service

This service renders the interactive photo grid element for the AirBnb clone app.

# Install app
Clone the repo and from the root folder of the project run thge below command:
npm install

# DB seed
Create .env file in root of the project with below structure and replace values as per your AWS account:

AWS_ACCESS_KEY_ID=<placeholder>
AWS_SECRET_ACCESS_KEY=<placeholder>
AWS_REGION=<placeholder>
AWS_BUCKET_NAME=<placeholder>

Then, from command line from the root directory (for the .env file to be recognized):
npm run seed

This will create 5 photos for each room => 500 entries in DB and S3 bucket => ~ 5-10 minutes execution time

# run the service
npm start