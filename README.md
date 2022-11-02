# Resonance 🎵

## What is Resonance 
We believe that nothing can substitute the memory and emotions for each individual. People express feelings through various ways, listening to music may be a good way to express feelings, make people feel included and resonating. **Resonance** is an android application that was designed and developed to enhance the interaction between people through music sharing, or simply, to document your memory. 

People walk through the same way, listening to the same music together. 

**Through Resonance, we connect people with music. Through music, we hear you.**


## How It Works 

In **Resonance**, you can connect your account with Spotify. Any moment, anywhere, you can leave a trace in the map along with one song that resonates with you. You could also follow other users and explore what they have left for their memory, or discover and interact with traces in your nearby locations. 

## For Developers 
The backend for **Resonance** is deployed in Heroku. Detailed documentation of Api refers to [here](https://github.com/yongk1/resonance-backend). Currently, all you need is to run the frontend. 

### How to Run in an Emulator 

1. Git clone the project into your local device


2. Install Dependencies: 
-  `cd frontend`
- `npm install`

3. Configure and run an emulator in Android Studio


4. Start the app: `npx react-native run-android` 

## TroubleShooting 

### Fail to npm install 

 -  Try  `npm install -—legacy-peer-deps`
 -  If it does not work, use  `npm install -—force`
    
    



### Fail to connect to the emulator in MacOS 

Please follow the step-by-step solution [here](https://github.com/facebook/react-native/issues/28712#issuecomment-617384353).

### Fail to build the app 

1. (In the **/frontend** directory) `cd android` 

2. `./gradlew clean`

3. Go back to the **/frontend** directory and re-run `npx react-native run-android` 

   

## Features



### Login/Logout/Register 

Our application provides the normal login/out and registration with corresponding notification functions↓↓↓
**Login**

![图片](https://user-images.githubusercontent.com/92515186/199445466-ab4d526e-4ac8-4fae-abb8-7b1ccf8da5d5.png)

**Login Failed Notification**

![图片](https://user-images.githubusercontent.com/92515186/199445573-abbe2fe5-9d91-4ea1-a046-6639aae9baee.png)

**Registration**

![图片](https://user-images.githubusercontent.com/92515186/199445661-7e967ab0-3a07-4310-a449-501388ddec5f.png)

**Registration Failed Notification**

![图片](https://user-images.githubusercontent.com/92515186/199445734-7d33366d-bc0b-48ae-9a06-8cb3c157f4b5.png)

### Share Music in Your Current Location

You can leave you music trace on your current location↓↓↓
`Click Leave Trace -> Search Your Music -> Click the Chosen Music and Click Yes`

![图片](https://user-images.githubusercontent.com/92515186/199440210-0a4945a3-3420-43a9-8649-42e74b9c0ff0.png)

### Shake to Find Other's Traces and Comment Them

You can find other's music traces just by shaking your phone↓

![图片](https://user-images.githubusercontent.com/92515186/199446438-4696d9a5-7178-47a8-83e5-79f114dfb3e6.png)

### Follow Other Users and Check Their Trace

Follow other users and check their traces↓↓↓
`Shake to Find Other Music Trace -> Click Sharers' to Access Their Profiles -> Click Follow -> Access **Moment** via side drawer`

**Check Their Profile and Fllow**

![图片](https://user-images.githubusercontent.com/92515186/199446664-9d2923f2-7b63-4c71-b2f9-2523161e8e1d.png)

**See Their Traces in Moment**

![图片](https://user-images.githubusercontent.com/92515186/199446815-a8893100-9834-4582-a1b0-7088038ec68e.png)

### Edit and Upload Your Profile

Our application provides profile editing function, you can find it in side drawer `Profile` section

`Open Side Drawer -> Click **Profile** -> Click **Edit** button in your profile page`

![图片](https://user-images.githubusercontent.com/92515186/199446893-2791c0a5-9154-404e-a246-1ff130c1d69b.png)




