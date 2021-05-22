# Cloudbnb Photos System Design

This service contains inherited front-end legacy code of an Airbnb-like photo grid module. The back-end system was scaled to 85 million database records and redesigned to support a minimum of 100 requests per second on EC2 using a t2.micro instance.

![screenshot](./screenshot.png)

## Technologies Used

* [React](https://github.com/facebook/react)
* [Express](http://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Sequelize](https://sequelize.org/)
* [CouchDB](https://couchdb.apache.org/)
* [Redis](https://redis.io/)
* [Nginx](https://www.nginx.com/)
* [New Relic](https://newrelic.com/)
* [Artillery](https://artillery.io/)
* [Loader.io](https://loader.io/)

## Related Projects

- [Availability Calendar Service - Danny H.](https://github.com/sdc-jackson/availability-service)
- [User Profile Service - Barsha S.](https://github.com/sdc-jackson/user-service)


## Development

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Clone the repo and from the root folder of the project run the command below:
```
npm install
```

## Database seeding
### 10 million unique records
Create .env file in root of the project with below structure and replace values as per your credentials account:
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

POSTGRES_USER=
POSTGRES_PW=
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DB=

COUCHDB_USER=
COUCHDB_PW=
```

Then, from command line of the root directory run:
```
npm run s3seeder
npm run pg-seeder
npm run couchdb-seeder
```
This will create:
* 1000 entries in AWS S3 bucket
* 85 million records in the Postgres database
* 10 million document records in CouchDB
* 30 minutes execution time (estimated)

Start the dev environment
```sh
npm run start
npm run build
```

Open the browser
```
http://localhost:5005
```

# API
This describes the resources that make up the photos-service REST API. All data is sent and received as JSON.

## List photo details for a room ID
> **`GET`** `/rooms/:id/getPhotosByRoomID`

Returns photo data at a given room ID

### Parameters
| Name        | Type        | In   | Description       |
| ----------- | ----------- | ---- | ----------------- |
| room_id     | String      | path | room_id parameter |

### Response
* Success
  - Status: 200 OK
* Error
  - Status: 500: “Internal Server Error”

### Code sample

```
[
  {
      "_id": "603f118110ce4218bfbf8e48",
      "room_id": "101",
      "name": "Licensed",
      "photo_id": "101100",
      "caption": "Sleek Granite Table",
      "is_primary": true,
      "storage_url": "https://sdc-photos-service.s3.us-east-2.amazonaws.com/Licensed101100.jpg",
      "__v": 0
  },
]
```
_________________

## Create photo record for a room ID
> **`POST`** `/rooms/:id/addPhotosByRoomID`

Returns photo data of newly created record

### Parameters
| Name        | Type        | In   | Description       |
| ----------- | ----------- | ---- | ----------------- |
| room_id     | String      | path | room_id parameter |
| name        | String      | body | *Required*        |
| photo_id    | String      | body | *Required*        |
| caption     | String      | body | *Required*        |
| is_primary  | Boolean     | body | *Required*        |
| storage_url | String      | body | *Required*        |

### Response
* Success
  - Status: 201 Created
* Error
  - Status: 500: “Internal Server Error”

### Code Sample
```
{
    "_id": "6043e40dc14a364e5eadb53e",
    "room_id": "101",
    "name": "New Photo Name",
    "photo_id": "101110",
    "caption": "New Photo Caption",
    "is_primary": false,
    "storage_url": "newphotourl.com",
    "__v": 0
}
```
_________________

## Update photo record for a room ID
> **`PUT`** `/rooms/:id/updatePhotoByRoomID`

### Parameters
| Name        | Type        | In   | Description       |
| ----------- | ----------- | ---- | ----------------- |
| photo_id    | String      | body | *Required* |
| name        | String      | body |      |
| caption     | String      | body |      |
| is_primary  | Boolean     | body |      |

### Response
* Success
  - Status: 204 No Content
* Error
  - Status: 500: “Internal Server Error”

_________________

## Delete photo record for a room ID
> **`DELETE`** `/rooms/:id/deletePhotoByRoomID`

### Parameters
| Name        | Type        | In   | Description       |
| ----------- | ----------- | ---- | ----------------- |
| room_id     | String      | path | room_id parameter |
| photo_id    | String      | body | *Required*        |


### Response
* Success
  - Status: 204 No Content
* Error
  - Status: 500: “Internal Server Error”