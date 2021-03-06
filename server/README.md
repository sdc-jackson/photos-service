# photos-service API

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
| room_id     | String      | path | room_id parameter |
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