$(function () {
        
        $(document).ready(function () {

            loadCountries();
            $('#add').on('click', addCountry);
            $('#submitCountry').on('click', submitCountry);

        });

        function loadCountries(){
               $.ajax({
                    // The URL for the request
                    url: "https://www.parse.com/1/classes/Country",

                    headers: {
                            "X-Parse-Application-Id" :  "i78vBTODi2feybCXUx7ECtHt7fenuLt7D1oaU6Jm",
                            "X-Parse-REST-API-Key" : "bfeN6I76U1q77G7lDoaoTxVHFWK7nnwpPEd0pX5r" 
                    },
                 
                    // The data to send (will be converted to a query string)
                    //data: {
                    //    id: 123
                    //},
                 
                    // Whether this is a POST or GET request
                    method: "get",
                 
                    // The type of data we expect back
                    dataType : "json",
                 
                    // Code to run if the request succeeds;
                    // the response is passed to the function
                    success: function( json ) {
                        console.log(json.results);
                        drowCountry(json.results);
                    },
                 
                    // Code to run if the request fails; the raw request and
                    // status codes are passed to the function
                    error: function( xhr, status, errorThrown ) {
                        alert( "Sorry, there was a problem!" );
                        console.log( "Error: " + errorThrown );
                        console.log( "Status: " + status );
                        console.dir( xhr );
                    },
                 
                    // Code to run regardless of success or failure
                    //complete: function( xhr, status ) {
                     //   alert( "The request is complete!" );
                    //}
            });
        }

        function drowCountry(countries){
                $(countries).each(function (_, country) {
           $('tbody').append($('<tr>')
                    .append($('<td>').html(country.name))
                    .append($('<td>').html(country.createdAt))
                    .append($('<td>').html(country.updatedAt))
                );
           
        });
            $('#wrapper').append('<input type="button" value="Add Country"  id="add">')
        }

        function addCountry(){
            console.log("aaaa")
                   $('tbody').append($('<tr>')
                    .append($('<td>').html('<input type="text" id="countryName">'))
                    .append($('<td>').html('<input type="button" value="Submit"  id="submitCountry">'))
                );
        }

        function submitCountry(){
                var newCountry = {
                    "name" : $("#countryName").val()
                }
                $.ajax({
                    // The URL for the request
                    url: "https://www.parse.com/1/classes/Country",

                    headers: {
                            "X-Parse-Application-Id" :  "i78vBTODi2feybCXUx7ECtHt7fenuLt7D1oaU6Jm",
                            "X-Parse-REST-API-Key" : "bfeN6I76U1q77G7lDoaoTxVHFWK7nnwpPEd0pX5r" 
                    },
                 
                    // The data to send (will be converted to a query string)
                    data: JSON.stringif(newCountry),
                 
                    // Whether this is a POST or GET request
                    method: "post",
                    
                    // The type of data we expect back
                    dataType : "json",
                 
                    // Code to run if the request succeeds;
                    // the response is passed to the function
                    success: function( json ) {
                        console.log(json.results);
                        drowCountry(json.results);
                    },
                 
                    // Code to run if the request fails; the raw request and
                    // status codes are passed to the function
                    error: function( xhr, status, errorThrown ) {
                        alert( "Sorry, there was a problem!" );
                        console.log( "Error: " + errorThrown );
                        console.log( "Status: " + status );
                        console.dir( xhr );
                    },
                 
                    // Code to run regardless of success or failure
                    //complete: function( xhr, status ) {
                     //   alert( "The request is complete!" );
                    //}
            });
        }



            function processRight(){
                var $active = $("img.active");
                    if ($active.next().length) {
                        moveToNext();
                    }else {
                            $active.removeClass('active').addClass('inactive');
                            $('img#first').addClass('active').removeClass('inactive');
                    };
            }

         function moveToNext(){
                var $active = $("img.active");
                var $next = $active.next();
                $next.addClass('active');
                $next.removeClass('inactive');
                $active.removeClass('active');
                $active.addClass('inactive');
        }

        function moveToPrev(){
                var $active = $("img.active");
                var $prev = $active.prev();
                $prev.addClass('active');
                $prev.removeClass('inactive');
                $active.removeClass('active');
                $active.addClass('inactive');
        }

}());