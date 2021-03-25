$('#clock-c').countdown("2022/11/21", function(event) {
    var $this = $(this).html(event.strftime(''
    + '<span class="h1 font-weight-bold">%D</span> Day%!d'
    + '<span class="h1 font-weight-bold">%H</span> Hr'
    + '<span class="h1 font-weight-bold">%M</span> Min'
    + '<span class="h1 font-weight-bold">%S</span> Sec'));
});

const url = 'https://restcountries.eu/rest/v2';

let dropdown = $('#locality-dropdown');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose your Country</option>');
dropdown.prop('selectedIndex', 0);


// Populate dropdown with list of provinces
$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    dropdown.append($('<option></option>').attr('value', entry.alpha3Code).text(entry.name));
  })
});

document.querySelector('#locality-dropdown').addEventListener("change", function(e) {
    document.body.style.background = 'url(https://restcountries.eu/data/'+ this.value.toLowerCase() + '.svg)';
    console.log("I have been changed", this.value.toLowerCase());
});
