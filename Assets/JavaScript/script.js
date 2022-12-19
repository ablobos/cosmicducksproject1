var wikiData;
$('.btn').on("click", function (event) { 
    event.preventDefault();
    searchTerm = $("#searchInput").val();
    // console.log(searchTerm);
    getWikiInfo();
});


//var wikiURL = 'https://en.wikipedia.org/w/rest.php/v1/page/Pet_door';
//var wikiURL = "https://en.wikipedia.org/api/rest_v1/page/mobile-html/Pet_door";
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
    // if (wikiTitle !== null ) {
    // wikiTitle.remove();
    // wikiIcon.remove();
    // wikiDescr.remove();
    // wikiExcerpt.remove();
    // articleURL.remove();
    // }
    //this adds in the title of the wiki page as an html element on the page
    var wikiTitle = document.createElement("div");
    wikiTitle.innerHTML= '<h3>' + data.title + '</h3>';
    document.body.appendChild(wikiTitle);
    //this adds in the page's icon as an html element on the page
    //some of the articles do not have a thumbnail image, so if the thumbnail is null we don't create an element for it
    //TODO: figure out how to make icon bigger?
    if (data.thumbnail !== null) {
    var wikiIcon = document.createElement("img");
    wikiIcon.setAttribute("src", "https:" + data.thumbnail.url);
    document.body.appendChild(wikiIcon); }
    //adds article description to page
    var wikiDescr = document.createElement("div");
    wikiDescr.innerHTML = '<p>' + data.description + '</p.>';
    document.body.appendChild(wikiDescr);
    //adds brief summary/excerpt to page
    var wikiExcerpt = document.createElement("div");
    wikiExcerpt.innerHTML = '<p>' + data.excerpt + ' ... </p>';
    document.body.appendChild(wikiExcerpt);
    //
    var articleURL = document.createElement("a");
    articleURL.setAttribute("href", 'https://en.wikipedia.org/?curid=' + data.id);
    articleURL.innerHTML = 'https://en.wikipedia.org/?curid=' + data.id;
    document.body.appendChild(articleURL);

}


