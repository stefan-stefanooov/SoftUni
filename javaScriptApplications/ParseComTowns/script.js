$(function () {
        
        $(document).ready(function () {
            //$('div[id="table-container-towns"]').hide();
            loadCountries();
            $('#add').on('click', addCountry);
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

        function loadTowns(country){
                    var filterObj = { "country": country };
                    var filterTowns = JSON.stringify(filterObj);
                   $.ajax({
                        // The URL for the request
                        url: "https://www.parse.com/1/classes/town?where=" + filterTowns,

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
                            //drowCountry(json.results);
                            console.log(json);
                            console.log(country);
                            drowTowns(json, country)
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
                $('tbody[id="countries"]').append($('<tr>').attr("countryName",country.name)
                    .append($('<td>').html(country.name).attr("countryid",country.objectId))
                    .append($('<td>').html(country.createdAt))
                    .append($('<td>').html(country.updatedAt))
                    .append($('<td>').html('<input type="button" value="Delete"  class="delCountry" id="' + country.objectId + '">'))
                    .append($('<td>').html('<input type="button" value="Edit"  class="edCountry" id="' + country.objectId + '">'))
                    .append($('<td>').html('<input type="button" value="Show Towns"  class="showTowns" id="' + country.name + '">'))
                );
                });
                 $('.delCountry').on('click', function(){
                    deleteCountry($(this).attr('id'));
                 });
                 $('.edCountry').on('click', function(){
                    editCountry($(this).attr('id'));
                 });
                $('.showTowns').on('click', function(){
                    if ($('table[id="towns"]').length > 0)  {
                         console.log($('table[id="towns"]'));
                        $('div[id="table-container-towns"]').html("");
                    }
                    else{
                        loadTowns($(this).attr('id'));                     
                    };
                 });
        }

        function drowTowns(towns, country){
                $('div[id="table-container-towns"]').append($("<h2>").text("Towns in " + country));
                $('div[id="table-container-towns"]').append($("<table>").attr("id", "towns")
                                                                                .append($("<thead>")
                                                                                    .append($("<tr>")
                                                                                    .append($("<th>").text("Town"))
                                                                                    .append($("<th>").text("Created At"))
                                                                                    .append($("<th>").text("Updated At")) )));
                $('table[id="towns"]').append($("<tbody>").attr("id", "towns"));
                $(towns.results).each(function (_, town) {
                $('tbody[id="towns"]').append($('<tr>')
                    .append($('<td>').html(town.name).attr("townid",town.objectId))
                    .append($('<td>').html(town.createdAt))
                    .append($('<td>').html(town.updatedAt))
                    .append($('<td>').html('<input type="button" value="Delete"  class="delTowns" id="' + town.objectId + '">'))
                    .append($('<td>').html('<input type="button" value="Edit"  class="edTowns" id="' + town.objectId + '">'))
                    );
                });
                $('div[id="table-container-towns"]').append($("<input>").attr("type","button").attr("value","Add Town").attr("id","addTown"));
                $('#addTown').on('click', function(){
                    addTown(country);
                });
                $('.delTowns').on('click', function(){
                   deleteTown($(this).attr('id'), country);
                });
                $('.edTowns').on('click', function(){
                   editTown($(this).attr('id'), country);
                });
        }

        function showTowns(){
                $('tbody').html("");
                loadCountries();
        }

        function refreshCountry(countries){
                $('tbody').html("");
                loadCountries();
        }

        function refreshTowns(country){
                $('div[id="table-container-towns"]').html("");
                loadTowns(country);
        }

        function addCountry(){
                $('tbody').append($('<tr>')
                                .append($('<td>').html('<input type="text" id="countryName">'))
                                .append($('<td>').html('<input type="button" value="Submit"  id="submitCountry">'))
                );
                $('#submitCountry').on('click', submitCountry);
        }

        function addTown(country){
                $('tbody[id="towns"]').append($('<tr>')
                                .append($('<td>').html('<input type="text" id="townName">'))
                                .append($('<td>').html('<input type="button" value="Submit"  id="submitTown">'))
                );
                $('#submitTown').on('click', function(){
                    submitTown(country);
                });
        }

        function editCountry(countryID){
                var filter = "td[countryid='" + countryID +"']";
                $(filter).html('<input type="text" value=""  id="newCountry"><input type="button" value="Submit"  id="submitNewCountry">');
                $('#submitNewCountry').on('click', function (){
                    submitEditCountry(countryID)
                });
        }

        function editTown(townID, country){
                var filter = "td[townid='" + townID +"']";
                $(filter).html('<input type="text" value=""  id="newTown"><input type="button" value="Submit"  id="submitNewTown">');
                $('#submitNewTown').on('click', function (){
                    submitEditTown(townID, country)
                });
        }

        function deleteCountry(countryID){
                $.ajax({
                    // The URL for the request
                    url: "https://www.parse.com/1/classes/Country/" + countryID,

                    headers: {
                            "X-Parse-Application-Id" :  "i78vBTODi2feybCXUx7ECtHt7fenuLt7D1oaU6Jm",
                            "X-Parse-REST-API-Key" : "bfeN6I76U1q77G7lDoaoTxVHFWK7nnwpPEd0pX5r" 
                    },
                 
                    // The data to send (will be converted to a query string)
                    //data: JSON.stringify(newCountry),
                 
                    // Whether this is a POST or GET request
                    method: "delete",
                    
                    // The type of data we expect back
                    dataType : "json",
                 
                    // Code to run if the request succeeds;
                    // the response is passed to the function
                    success: function( json ) {
                            refreshCountry();
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

        function deleteTown(townID, country){
                $.ajax({
                    // The URL for the request
                    url: "https://www.parse.com/1/classes/town/" + townID,

                    headers: {
                            "X-Parse-Application-Id" :  "i78vBTODi2feybCXUx7ECtHt7fenuLt7D1oaU6Jm",
                            "X-Parse-REST-API-Key" : "bfeN6I76U1q77G7lDoaoTxVHFWK7nnwpPEd0pX5r" 
                    },
                 
                    // The data to send (will be converted to a query string)
                    //data: JSON.stringify(newCountry),
                 
                    // Whether this is a POST or GET request
                    method: "delete",
                    
                    // The type of data we expect back
                    dataType : "json",
                 
                    // Code to run if the request succeeds;
                    // the response is passed to the function
                    success: function( json ) {
                            refreshTowns(country);
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

        function submitEditCountry(countryID){
                    var newCountry = {
                        "name" : $("#newCountry").val()
                    }
                    $.ajax({
                        // The URL for the request
                        url: "https://www.parse.com/1/classes/Country/" + countryID,

                        headers: {
                                "X-Parse-Application-Id" :  "i78vBTODi2feybCXUx7ECtHt7fenuLt7D1oaU6Jm",
                                "X-Parse-REST-API-Key" : "bfeN6I76U1q77G7lDoaoTxVHFWK7nnwpPEd0pX5r" 
                        },
                     
                        // The data to send (will be converted to a query string)
                        data: JSON.stringify(newCountry),
                     
                        // Whether this is a POST or GET request
                        method: "put",
                        
                        // The type of data we expect back
                        dataType : "json",
                     
                        // Code to run if the request succeeds;
                        // the response is passed to the function
                        success: function( json ) {
                                refreshCountry();
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

        function submitEditTown(townID, country){
                    var newTown = {
                        "name" : $("#newTown").val()
                    }
                    $.ajax({
                        // The URL for the request
                        url: "https://www.parse.com/1/classes/town/" + townID,

                        headers: {
                                "X-Parse-Application-Id" :  "i78vBTODi2feybCXUx7ECtHt7fenuLt7D1oaU6Jm",
                                "X-Parse-REST-API-Key" : "bfeN6I76U1q77G7lDoaoTxVHFWK7nnwpPEd0pX5r" 
                        },
                     
                        // The data to send (will be converted to a query string)
                        data: JSON.stringify(newTown),
                     
                        // Whether this is a POST or GET request
                        method: "put",
                        
                        // The type of data we expect back
                        dataType : "json",
                     
                        // Code to run if the request succeeds;
                        // the response is passed to the function
                        success: function( json ) {
                                refreshTowns(country);
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
                    data: JSON.stringify(newCountry),
                 
                    // Whether this is a POST or GET request
                    method: "post",
                    
                    // The type of data we expect back
                    dataType : "json",
                 
                    // Code to run if the request succeeds;
                    // the response is passed to the function
                    success: function( json ) {
                            refreshCountry();
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

        function submitTown(country){
                var newTown = {
                    "name" : $("#townName").val(),
                    "country": country
                }
                $.ajax({
                    // The URL for the request
                    url: "https://www.parse.com/1/classes/town",

                    headers: {
                            "X-Parse-Application-Id" :  "i78vBTODi2feybCXUx7ECtHt7fenuLt7D1oaU6Jm",
                            "X-Parse-REST-API-Key" : "bfeN6I76U1q77G7lDoaoTxVHFWK7nnwpPEd0pX5r"
                    },
                 
                    // The data to send (will be converted to a query string)
                    data: JSON.stringify(newTown),
                 
                    // Whether this is a POST or GET request
                    method: "post",
                    
                    // The type of data we expect back
                    dataType : "json",
                 
                    // Code to run if the request succeeds;
                    // the response is passed to the function
                    success: function( json ) {
                            refreshTowns(country);
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


}());