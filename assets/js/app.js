var topics = ["The Simpsons", "Friends", "The Office", "This is Us", "Seinfeld"];


function displayGif() {
    $("#gif-view").empty();
    var gif = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=sybfKFC9O2WV57DUcrhjqVhOm1enupep&q=" + gif + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        methog: "GET"
    }).then(function (response) {
        var results = response.data;

        var seeMore = '<a class="btn btn-primary btn-md" id="see-more" role="button">See More</a>';
        $(".see-more-div").html(seeMore);

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='gifs'>");
            var imgURL = results[i].images.fixed_height_still.url;
            var rating = results[i].rating.toUpperCase();
            var p = $('<p>').text("Rating: " + rating);
            p.addClass('rating');
            var gifImage = $("<img>");
            gifImage.attr('src', results[i].images.fixed_height_still.url);
            gifImage.attr('data-still', results[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            gifImage.attr('data-state', 'still');
            gifImage.addClass("gifImage");
            gifDiv.append(p);
            gifDiv.append(gifImage);
            $("#gif-view").prepend(gifDiv);
        }

        $("#see-more").on("click", function () {
            queryURL = "http://api.giphy.com/v1/gifs/search?api_key=sybfKFC9O2WV57DUcrhjqVhOm1enupep&q=" + gif + "&limit=20&offset=0&rating=G&lang=en";
            $.ajax({
                url: queryURL,
                methog: "GET"
            }).then(function (response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='gifs'>");
                    var imgURL = results[i].images.fixed_height_still.url;
                    var rating = results[i].rating.toUpperCase();
                    var p = $('<p>').text("Rating: " + rating);
                    p.addClass('rating');
                    var gifImage = $("<img>");
                    gifImage.attr('src', results[i].images.fixed_height_still.url);
                    gifImage.attr('data-still', results[i].images.fixed_height_still.url);
                    gifImage.attr('data-animate', results[i].images.fixed_height.url);
                    gifImage.attr('data-state', 'still');
                    gifImage.addClass("gifImage");
                    gifDiv.append(p);
                    gifDiv.append(gifImage);
                    $("#gif-view").append(gifDiv);
                }

                $(".gifImage").on("click", function () {
                    var state = $(this).attr('data-state');
                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else if (state == 'animate') {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
                });
            });
            $(".see-more-div").html(" ");
        });

        $(".gifImage").on("click", function () {
            var state = $(this).attr('data-state');
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else if (state == 'animate') {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        });

    });
}


function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<a class='btn btn-primary btn-lg'></a>");
        a.addClass("button");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons").append(a);
    }
}
$("#search-gif").on("click", function (event) {
    event.preventDefault();
    var topic = $("#search-input").val().trim();
    var newTopic = topic.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    topics.push(newTopic);
   localStorage.setItem("button", JSON.stringify(topics));
    renderButtons();
    

})
$(document).on("click", ".button", displayGif);
renderButtons();

