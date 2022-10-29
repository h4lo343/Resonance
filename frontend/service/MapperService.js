
//mock data 
const BACKEND_API_URL = "https://comp90018-mobile-computing.herokuapp.com/"

// export const getHistoryTrace = () => {
//     return new Promise((resolve, reject) => {
//         resolve({
//             traces: [
//                 {
//                     id: "634438611f6299019d23ede7",
//                     sharer: "test",
//                     song: {
//                         _id: "634423ed5f9d5e2e4c7109da",
//                         name: "testSong",
//                         songUrl: "tesSongUrl",
//                         artist: "testArtist",
//                         songImageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png",
//                         __v: 0
//                     },
//                     timestamp: "2022-10-10T15:21:05.165Z",
//                     comments: [
//                         {
//                             id: "634b7c5e83ba04024f35c22f",
//                             user: "test",
//                             timestamp: "2022-10-16T03:37:02.779Z",
//                             comment: "Hello World"
//                         },
//                         {
//                             id: "634b7c333faad29fb5e10933",
//                             user: "test",
//                             timestamp: "2022-10-16T03:36:19.364Z",
//                             comment: "Hello World"
//                         }
//                     ],
//                     location: {
//                         latitude: 37.3883736,
//                         longitude: -122.0867630
//                     }
//                 }
//             ]
//         });
// })}

export const getHistoryTrace = async (AccessToken) => {
    console.log("getHistoryTrace")
    const response = await fetch(BACKEND_API_URL+"trace/getSelfTraces", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AccessToken}`
        }
      });

    if (response.status != 200){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    
    const histories = await response.json();
    console.log(histories)
    return histories;

}