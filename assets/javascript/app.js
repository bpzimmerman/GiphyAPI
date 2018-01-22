$(document).ready(function(){
    var app = {
        // maximum number of gifs to display
        numberOfGifs: 12,
        // number of rows to be used to display the gifs
        displayRows: 3,
        // holder for the number of gifs to be displayed per row - the calculation is performed in the displayGifs method
        gifsPerRow: 0,
        gifObject: {},
        // initial button array
        buttons: ["Better Off Dead", "The Goonies", "Vacation", "The Princess Bride", "Back to the Future", "Ghostbusters", "Ferris Bueller's Day Off", "Beetlejuice", "Fast Times at Ridgemont High", "Weird Science", "Scrooged", "Caddyshack", "Trading Places", "Real Genius", "Spaceballs", "Weekend at Bernie's", "Big Trouble in Little China", "One Crazy Summer", "A Christmas Story", "Trading Places"],
        // method to display the button in the button array
        displayButtons: function(){
            // clears the button location
            $("#buttons").empty();
            // loops through the button array and adds buttons to the DOM
            app.buttons.forEach(function(item){
                // button with label
                var bttn = $("<button>").text(item);
                // add classes to the buttons
                bttn.addClass("btn btn-default gifButtons");
                // add data to the buttons (replaces spaces with "+")
                bttn.attr("data", item.replace(/\s/g, "+"))
                // appends the finished buttons
                $("#buttons").append(bttn);
            });
        },
        // method to display the gifs
        displayGifs: function(){
            // declare local variables
            var category = $(this).attr("data");
            var apiKey = "7rSO11KnqXxXvu2uymZBS0hR77yFRh9E";
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=" + apiKey + "&limit=" + app.numberOfGifs;
            // force active styling for the currently seleted category
            $(".active").removeClass("active");
            $(this).addClass("active");
            // calculate the gifs to be displayed per row
            app.gifsPerRow = Math.ceil(app.numberOfGifs / app.displayRows);
            // empty the gif location
            $("#gifLocation").empty();
            // create the rows to house the gifs and ratings
            for (var i = 1; i < (app.displayRows + 1); i += 1){
                var gifRow = $("<div>").addClass("row");
                gifRow.attr("id", "row" + i);
                $("#gifLocation").append(gifRow);
            };
            // ajax call to get the gifs
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                console.log(response);
                // store the gif object for later use
                app.gifObject = response;
                console.log(app.gifObject);
                // local variable to keep track of the row number
                var x = 1;
                // for loop to get the arguments for and to call the gifAppend method
                for (var i = 0; i < response.data.length; i += app.gifsPerRow){
                    // if - else statement to stop the gifAppend method at the correct endpoint
                    if (i + app.gifsPerRow > response.data.length){
                        var end = response.data.length;
                    }
                    else{
                        var end = i + app.gifsPerRow;
                    };
                    app.gifAppend(i, end, x, response);
                    x += 1;
                };
            });
        },
        // method to create divs to house the ratings and gifs and append them to the appropriate row
        gifAppend: function(start, stop, rowNumber, obj){
            for (var j = start; j < stop; j += 1){
                // create div to house the rating and gif
                var gifDiv = $("<div>").addClass("col-md-" + (12 / app.gifsPerRow) + " still gif");
                gifDiv.attr("id", j);
                // create the paragraph element to house the rating
                var rating = $("<p>").text("Rating: " + obj.data[j].rating);
                // create the image element to house the gif
                var gif = $("<img>").attr("src", obj.data[j].images.original_still.url);
                // append the paragraph and image elements onto the div
                gifDiv.append(rating, gif);
                // append the div with the rating and gif onto the appropriate row div
                $("#row" + rowNumber).append(gifDiv);
            };
        },
        // method to toggle the gif animation on and off
        toggleGifAnimation: function(){
            // if - else depending on if the gif is moving or still
            if ($(this).hasClass("still")){
                // changes class from still to motion
                $(this).removeClass("still");
                $(this).addClass("motion");
                // gets the id of the div selected (cooresponds to the array index of the original item)
                var sel = parseInt($(this).attr("id"));
                // changes the image source to the animated gif
                var ani = app.gifObject.data[sel].images.original.url;
                $("#" + sel + " img").attr("src", ani);
            }
            else{
                // changes class from motion to still
                $(this).removeClass("motion");
                $(this).addClass("still");
                // gets the id of the div selected (cooresponds to the array index of the original item)
                var sel = parseInt($(this).attr("id"));
                // changes the image source to the still picture
                var ani = app.gifObject.data[sel].images.original_still.url;
                $("#" + sel + " img").attr("src", ani);
            };
        },
        // method to add a gif category button
        addButton: function(event){
            event.preventDefault();
            // gets the input from the textbox
            var newButton = $("#button-input").val().trim();
            //makes sure the input value is not already in the array
            if (app.buttons.indexOf(newButton) === -1){
              app.buttons.push(newButton);
            };
            // calls the displayButtons method to display the buttons (gif categories) array in a series of buttons
            app.displayButtons();
        }
    };
    // calls the displayGifs method on clicking one of the gif category buttons to display the specified number of gifs
    $(document).on("click", ".gifButtons", app.displayGifs);
    // calls the toggleGifAnimation method on clicking one of the gifs to turn the animationon and off
    $(document).on("click", ".gif", app.toggleGifAnimation);
    // calls the addButton method to add a gif category when using the form
    $("#add-button").on("click", app.addButton);
    // initial display of the gif buttons
    app.displayButtons();
});