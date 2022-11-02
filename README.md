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

   

## Feature



### Login/Logout/Register 

Our application provides the normal login/out and registration with corresponding notification functions:

**Login**

![图片](https://user-images.githubusercontent.com/92515186/199439379-682ad4d2-a639-44f3-a5b8-a1125cc9e978.png)


**Login Failed Notification**

![图片](https://user-images.githubusercontent.com/92515186/199439451-8df7fe63-4341-4cfc-a9ff-40f34f3dbc27.png)

**Registration**

![图片](https://user-images.githubusercontent.com/92515186/199439496-dfbdca95-7121-46f4-9c37-4a9615f35f5e.png)

**Registration Failed Notification**

![图片](https://user-images.githubusercontent.com/92515186/199439667-2c2fdedb-294a-4370-afe9-6ecbde842216.png)

### Share Music in Your Current Location

`Click Leave Trace -> Search Your Music -> Click the Chosen Music and Click Yes`

![图片](https://user-images.githubusercontent.com/92515186/199440210-0a4945a3-3420-43a9-8649-42e74b9c0ff0.png)

### Shake to Find Other's Traces and Comment Them

![图片](https://user-images.githubusercontent.com/92515186/199441090-cefcadf7-8e4b-48e8-97f4-d625bf2aab48.png)

### Fllow Other Users and Check Their Trace

**Check Their Profile and Fllow**

![图片](https://user-images.githubusercontent.com/92515186/199441534-524571d1-2bc8-4692-88f3-283eded7c90a.png)

**See Their Traces in Moment**

![图片](https://user-images.githubusercontent.com/92515186/199441745-855f34e4-d98a-483a-8053-4bf2dee0ff6a.png)

### Edit and Upload Your Profile

![图片](https://user-images.githubusercontent.com/92515186/199441891-58f704c8-9496-4a16-b9c7-5f8ce510d683.png)



