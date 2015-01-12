// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    'use strict';

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnAddUser').on('click', addUser);

    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
});

// Functions =============================================================

// Fill table with data
function populateTable() {
    'use strict';

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
}

// Show User Info
function showUserInfo(event) {
    'use strict';
    /*jshint validthis:true */
    event.preventDefault(); // Prevent Link from Firing

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) {
        return arrayItem.username;
    }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
}

// Add User
function addUser(event) {
    'use strict';
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount) {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }

    // If it is, compile all user info into one object
    var newUser = {
        'username': $('#inputUserName').val(),
        'email': $('#inputUserEmail').val(),
        'fullname': $('#inputUserFullname').val(),
        'age': $('#inputUserAge').val(),
        'location': $('#inputUserLocation').val(),
        'gender': $('#inputUserGender').val()
    };

    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: newUser,
        url: '/users',
        dataType: 'JSON'
    }).done(function(response) {

        // Check for successful response
        if (response.msg === 'ok') {
            // Clear the form inputs
            $('#addUser fieldset input').val('');

            // Update the table
            populateTable();
        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);
        }
    });
}

// Add User
function deleteUser(event) {
    'use strict';
    /*jshint validthis:true */
    event.preventDefault();

    // If it is, compile all user info into one object
    var userId = $(this).attr('rel');

    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'DELETE',
        url: '/users/' + userId,
    }).done(function(response) {

        // Check for successful response
        if (response.msg === 'ok') {
            // Clear the form inputs
            $('#addUser fieldset input').val('');

            // Update the table
            populateTable();
        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);
        }
    });
}
