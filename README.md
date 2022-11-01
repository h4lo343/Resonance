# Resonance 🎵

## What is Resonance 
We believe that nothing can substitute the memory and emotions for each individual. People express feelings through various ways, listening to music may be a good way to express feelings, make people feel included and resonating. **Resonance** is an android application that was designed and developed to enhance the interaction between people through music sharing, or simply, to document your memory. 

People walk through the same way, listening to the same music together. 

**Through Resonance, we connect people with music. Through music, we hear you.**


## How It Works 

In *Resonance**, you can connect your account with Spotify. Any moment, anywhere, you can leave a trace in the map along with one song that resonates with you. You could also follow other users and explore what they have left for their memory, or discover and interact with traces in your nearby locations. 

## For Developers 
The backend for *Resonance** is deployed in Heroku. Detailed documentation of Api refers to [here](https://github.com/yongk1/resonance-backend) Currently, all you need is to run the frontend. 

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
2.  `./gradlew clean`
3.  Go back to the **/frontend** directory and rerun `npx react-native run-android` 
  
    
    
    
    
    
    
    
