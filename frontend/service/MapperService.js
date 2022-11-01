
//fetch history traces 
const BACKEND_API_URL = "https://comp90018-mobile-computing.herokuapp.com/"

export const getHistoryTrace = async (AccessToken) => {
    console.log("token: " + AccessToken)
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