$(document).ready(function(){
    var app = {
        buttons: ["Better Off Dead", "The Goonies", "Vacation", "The Princess Bride", "Back to the Future", "Ghostbusters", "Ferris Bueller's Day Off", "Beetlejuice", "Fast Times at Ridgemont High", "Weird Science", "Scrooged", "Caddyshack", "Trading Places", "Real Genius", "Spaceballs", "Weekend at Bernie's", "Big Trouble in Little China", "One Crazy Summer", "A Christmas Story", "Trading Places"],
        displayButtons: function(){
            $("#buttons").empty();
            app.buttons.forEach(function(item){
                var bttn = $("<button>").text(item);
                bttn.addClass("btn btn-default gifs");
                bttn.attr("data", item.replace(/\s/g, '+'))
                $("#buttons").append(bttn);
            });
        },
        displayGifs: function(){
            var category = $(this).attr("data");
            var apiKey = "7rSO11KnqXxXvu2uymZBS0hR77yFRh9E";
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=" + apiKey + "&limit=12";
            $("#gifLocation").empty();
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                console.log(response);

                response.data.forEach(function(item){
                    var gif = $("<img>").attr("src", item.images.original.url);
                    $("#gifLocation").append(gif);
                });
            });
        }
    };
    $(document).on("click", ".gifs", app.displayGifs);
    app.displayButtons();
});