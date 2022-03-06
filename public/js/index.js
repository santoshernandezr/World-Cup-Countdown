countries = [];

$('#clock-c').countdown("2022/11/21", function(event) {
    var $this = $(this).html(event.strftime('' +
        '<span class="h1 font-weight-bold">%D</span> Day%!d' +
        '<span class="h1 font-weight-bold">%H</span> Hr' +
        '<span class="h1 font-weight-bold">%M</span> Min' +
        '<span class="h1 font-weight-bold">%S</span> Sec'));
});

const url = 'https://restcountries.com/v3.1/all';

let dropdown = $('#locality-dropdown');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose your Country</option>');
dropdown.prop('selectedIndex', 0);


/**
 * Function gets data from 'https://restcountries.com/v3.1/all' and puts the country code and the country
 * name in a list of list as so [[code, country], [],...,[]]. Then we iterate through this list to populate
 * the dropdown, we use the 2 country code as the value and the country name for the text.
 */
$.getJSON(url, function(data) {
    $.each(data, function(key, entry) {
        // entry.name.common - country name
        // entry.cca2 - country code
        countries.push([entry.name.common, entry.cca2]);
    })

    // sorting the list by alphabetical order
    countries.sort()

    $.each(countries, function(index, country) {
        // country[0] - country name
        // country[1] - country code
        dropdown.append($('<option></option>').attr('value', country[1]).text(country[0]));
    })
});

/**
 * Function gets the tags which have the id #locality-dropdown and adds an event listener. The even listener
 * is for the background to change when it is clicked. When the dropdown is clicked the background will change
 * to the country that was clicked. 
 */
document.querySelector('#locality-dropdown').addEventListener("change", function(e) {
    document.body.style.background = 'url(https://flagcdn.com/' + this.value.toLowerCase() + '.svg)';
    document.body.style.backgroundSize = "100% 100%"
    console.log("I have been changed", this.value.toLowerCase());
});

/**
 * This block of code will get the login modal
 */
// Get the modal
var logInModal = document.getElementById("myModal");

// Get the button that opens the modal
var signInBtn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var Span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
signInBtn.onclick = function() {
    logInModal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == logInModal) {
            logInModal.style.display = "none";
        }
    }
}

// When the user clicks on <span> (x), close the modal
Span.onclick = function() {
    logInModal.style.display = "none";
    console.log("I am changing");
}

/**
 * This block of code will get the sign up modal
 */
var signUpModal = document.getElementById("myModal2");
var signUpBtn = document.getElementById('myBtn2');
var signUpSpan = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
signUpBtn.onclick = function() {
    logInModal.style.display = "none"
    signUpModal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == signUpModal) {
            signUpModal.style.display = "none";
        }
    }
}

// When the user clicks on <span> (x), close the modal
signUpSpan.onclick = function() {
    signUpModal.style.display = "none"
}