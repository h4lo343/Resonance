# Account operations

***

## Register

- [x] completed

**url** 	```/auth/register/```

**Parameter**

| Parameter | body/headers | Value type |
|-----------|--------------|------------|
| username  | body         | String     |
| email     | body         | String     |
| password  | body         | String     |
| full name | body         | String     |

**Example Response**

status code: 200
```json
{
    "msg": "registration successful"
}
```

***

## Login

- [x] completed

**url** 	```/auth/login/```

**Parameter**

| Parameter | body/headers | explain | Value type |
| --------- |--------------|---------| ---------- |
| email     | body         |email    | String     |
| password  | body         |password | String     |

**Example Response**

status code: 200
```json
{
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNjMjE4NDExMmZmY2I0ZDQ2ZjQ4MTMiLCJlbWFpbCI6Im5lZ3JvbmlAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJSdWltaW5nIFhpZSIsInVzZXJuYW1lIjoicm9uIiwicG9zdHMiOltdLCJpYXQiOjE2NjQ4OTE2MzcsImV4cCI6MTY2NDk3ODAzN30.KF88-OW6Hw1foxa0SvKBkMoAorNVlYsDC2S7RW8xkwc",
  "_id": "633c2184112ffcb4d46f4813",
  "email": "negroni@gmail.com",
  "fullName": "Ruiming Xie",
  "username": "ron",
  "posts": []
}
```

***

## Update user information

**url** 	```/user/updateUserInfo```

**Parameter**

| Parameter     | body/headers | Value type | Explanation              |
|---------------|--------------|------------|--------------------------|
| Authorization | headers      | String     | Bearer <token>           |
| update        | body         | json       | the contents need update |

**Example Request**

***headers:***

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNjMjE4NDExMmZmY2I0ZDQ2ZjQ4MTMiLCJlbWFpbCI6Im5lZ3JvbmlAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJSdWltaW5nIFhpZSIsInVzZXJuYW1lIjoibmVncm9uaSIsInBvc3RzIjpbXSwiaWF0IjoxNjY0ODg2MzU0LCJleHAiOjE2NjQ5NzI3NTR9.WtPv8_xlYknLntWQLJ5F2s0hTSmsP09V83hMuJCP4P4"
}
```

***body:*** 
```json
{
    "updates":{
        "username":"ron", 
        "fullName": "Ron"
    }
}
```

**Example Respond**

```json
{
    "_id": "633c2184112ffcb4d46f4813",
    "email": "negroni@gmail.com",
    "fullName": "Ron",
    "username": "ron",
    "posts": []
}
```
