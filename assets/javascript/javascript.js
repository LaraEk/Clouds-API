      // Initial array of clouds
      var clouds = ["cumulus", "cumulonimbus", "cumulostratus", "nimbus", "altocumulus", "altostratus", "cirrus", "cirrostratus", "cirrocumulus", "undulatus asparatus"];

      // displayCloudInfo function re-renders the HTML to display the appropriate content
      function displayCloudInfo() {

        var cloud = $(this).attr("data-name");
        var queryURL = "https://www.omdbapi.com/?t=" + cloud + "&y=&plot=short&apikey=trilogy";

        // Creating an AJAX call for the specific cloud button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          // Creating a div to hold the cloud
          var movieDiv = $("<div class='cloud'>");

          // Storing the rating data
          var rating = response.Rated;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          movieDiv.append(pOne);

          // Storing the release year
          var released = response.Released;

          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + released);

          // Displaying the release year
          movieDiv.append(pTwo);

          // Storing the plot
          var plot = response.Plot;

          // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);

          // Appending the plot
          movieDiv.append(pThree);

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          movieDiv.append(image);

          // Putting the entire cloud above the previous clouds
          $("#cloudcontainer").prepend(movieDiv);
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
