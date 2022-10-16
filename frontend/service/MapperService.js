//mock data 


export const getHistoryTrace = () => {
    return new Promise((resolve, reject) => {
        resolve([{
            info: {
                songName: "song1",
                author: "abc",
                url: "https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C",
                visualUrl: ""
            } ,
            id: 2,
            coordinate: {
                latitude: 37.3882736,
                longitude: -122.0867290
            }
        },
        {
            info: {
                songName: "song2",
                author: "abc",
                url: "https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C",
                visualUrl: ""
            } ,
            id: 3,
            coordinate: {
                latitude: 37.3882500,
                longitude: -122.0867283
            }
        },
        {
            info: {
                songName: "song3",
                author: "abc",
                url: "https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C",
                visualUrl: ""
            } ,
            id: 4,
            coordinate: {
                latitude: 37.3883736,
                longitude: -122.0867630
            }
        }
        ]);
      });
};