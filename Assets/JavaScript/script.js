const APIKEY = 'AIzaSyCGt6hDWBgYbjPW9h_jdA7i9c6iHsjiLYA';
const youtubeAPI = 'https://www.googleapis.com/youtube/v3/search?key='; // The "/search" is what specifies that I want to search for a video
let videoID = "PUT YOUTUBE VIDEO ID HERE";
var storedSearches = [];


$('#search-btn').on("click", function (event) { 
    event.preventDefault();
    searchTerm = $("#searchInput").val();
    // console.log(searchTerm);
    getWikiInfo();
    getYouTube();
    storePastSearches(searchTerm);
});


var getYouTube = function () {
    let searchYouTube = youtubeAPI + APIKEY +'&part=snippet&type=video&q=' + searchTerm;
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

var getWikiInfo = function () {
    var wikiURL = 'https://en.wikipedia.org/w/rest.php/v1/search/page?q=' + searchTerm + '&limit=1';
    fetch(wikiURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            //console.log(data.pages[0].excerpt);
            putWikiOnPage(data.pages[0]);
        }).catch(function (error) {
            console.log(error);
        });
};

var putWikiOnPage = function (data) {
  
    //this adds in the title of the wiki page into the html
    var wikiTitle = document.querySelector("#wiki-title");
    wikiTitle.innerHTML= data.title;
    //this adds in the page's icon as an html element on the page
    //some of the articles do not have a thumbnail image, so if the thumbnail is null we don't create an element for it
    //TODO: figure out how to make icon bigger?
    if (data.thumbnail !== null) {
    var wikiIcon = document.querySelector("#wiki-icon");
    wikiIcon.setAttribute("src", "https:" + data.thumbnail.url);
    } else {
    var wikiIcon = document.querySelector("#wiki-icon");
    wikiIcon.setAttribute("src", "./Assets/Images/lightbulb-icon.png" );
    }
    //adds article description to page
    var wikiDescr = document.querySelector("#wiki-description");
    wikiDescr.innerHTML = data.description;
    //adds brief summary/excerpt to page
    var wikiExcerpt = document.querySelector("#wiki-excerpt");
    wikiExcerpt.innerHTML = data.excerpt + ' ... ';

    //adds wikipedia article's url
    var articleURL = document.querySelector("#wiki-link");
    articleURL.setAttribute("href", 'https://en.wikipedia.org/?curid=' + data.id);
    articleURL.innerHTML = 'https://en.wikipedia.org/?curid=' + data.id;
    

}

//this function stores the current searchTerm in an array of storedSearches, and sets storedSearches up in local storage so that past searches are saved in the user's browser
var storePastSearches = function (searchTerm) {
    storedSearches = JSON.parse(localStorage.getItem("pastSearches"));
    if (storedSearches !== null) {
    storedSearches.push(searchTerm);
    localStorage.setItem("pastSearches", JSON.stringify(storedSearches));
    } else {
        searchTerm = [searchTerm];
        localStorage.setItem("pastSearches", JSON.stringify(searchTerm));
    }
}


