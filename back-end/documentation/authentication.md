## Account

#### Login

- [x] completed

**url** 	```/auth/login/```

**Parameter**

| Parameter | explain       | Value type |
| --------- |---------------| ---------- |
| authenticationMethod     | email / phone | String     |
| password  | password      | String     |

**Response**

```json
{
    "token": "token"
}
```

***

#### Register

- [x] completed

**url** 	```/auth/register/```

**Parameter**

| Parameter | Value type |
|-----------| ---------- |
| username  | String     |
| phone     | String     |
| email     | String     |
| password  | String     |

**Response**
```json
{
  msg: "register successfully"
}
```
