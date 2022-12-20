const APIKEY = 'AIzaSyCGt6hDWBgYbjPW9h_jdA7i9c6iHsjiLYA';
const youtubeAPI = 'https://www.googleapis.com/youtube/v3/search?key='; // The "/search" is what specifies that I want to search for a video
let searchYouTube = youtubeAPI + APIKEY +'&part=snippet&type=video&q=' + searchKeyWord;
let searchKeyWord = 'ducks';


var getYoutTube = function () {
    fetch(searchYouTube)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            console.log(data.items[0].id.videoId);
        }).catch(function (error) {
            console.log(error);
        });
};

getYoutTube();
