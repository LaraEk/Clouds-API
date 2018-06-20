      // Initial array of clouds
      var clouds = ["puffy cloud", "pretty cloud", "cumulus", "cumulonimbus", "cumulostratus", "nimbus", "altocumulus", "altostratus", "cirrus", "cirrostratus", "cirrocumulus", "undulatus asparatus", "noctilucent", "iridescent clouds", "thunderheads", "supercell", "thunderstorm", "clouds from plane window", "rainbow clouds","cloud and sephiroth"];

      // displayCloudInfo function re-renders the HTML to display the appropriate content
      function displayCloudInfo() {

        var cloud = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cloud + "&api_key=dc6zaTOxFJmzC&limit=10";
//        https://api.giphy.com/v1/gifs/search?q=cloud&api_key=dc6zaTOxFJmzC&limit=10

        // Creating an AJAX call for the specific cloud button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(queryURL);
            // Creating a div to hold the cloud
            var cloudDiv = $("<div class='cloud'>");

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;
          console.log(results.length);

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var cloudImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            cloudImage.attr("src", results[i].images.fixed_height_still.url);
            cloudImage.attr("data-still", results[i].images.fixed_height_still.url);            
            cloudImage.attr("data-animate", results[i].images.fixed_height.url);            
            cloudImage.attr("data-state", "still");
            // Appending the paragraph and image tag to the cloudDiv
            cloudDiv.append(p);
            cloudDiv.append(cloudImage);

          // Putting the entire cloud above the previous clouds
          $("#cloudcontainer").prepend(cloudDiv);
          }

            $("img").on("click", function() {
              // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
              var state = $(this).attr("data-state");
              console.log(state);
              // If the clicked image's state is still, update its src attribute to what its data-animate value is.
              // Then, set the image's data-state to animate
              // Else set src to the data-still value
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });

        });

      }


  
      // Function for displaying cloud data
      function renderButtons() {

        // Deleting the clouds prior to adding new clouds
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonholder").empty();

        // Looping through the array of clouds
        for (var i = 0; i < clouds.length; i++) {

          // Then dynamicaly generating buttons for each cloud in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of cloud-btn to our button
          a.addClass("cloud-btn");
          // Adding a data-attribute
          a.attr("data-name", clouds[i]);
          // Providing the initial button text
          a.text(clouds[i]);
          // Adding the button to the buttonholder div
          $("#buttonholder").append(a);
        }
      }

      // This function handles events where a cloud button is clicked
      $("#add-clouds").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var cloud = $("#cloudyinput").val().trim();

        // Adding cloud from the textbox to our array
        clouds.push(cloud);

        // Calling renderButtons which handles the processing of our cloud array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "cloud-btn"
      $(document).on("click", ".cloud-btn", displayCloudInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


// 2. Your app should take the topics in this array and create buttons in your HTML.
//   * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, 
    // non-animated gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif should animate. 
        // If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. 
        // Then make a function call that takes each topic in the array remakes the buttons on the page.
