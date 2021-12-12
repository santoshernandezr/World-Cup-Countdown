const url1 = '2018/worldcup.teams.json';
const url2 = '2018/worldcup.groups.json';
const url3 = '2018/worldcup.stadiums.json';

var africa = [];
var asia = [];
var centralAmerica = [];
var europe = [];
var middleEast = [];
var northAmerica = [];
var pac = [];
var southAmerica = [];

function makeCells(array, newRoww) {
    array.forEach(function (item, index) {
        var newCell = newRoww.insertCell();
        if (item.length == 0) {
            var newText = document.createTextNode(" ");
        } else {
            console.log("country: ", item[0], "code: ", item[1].toLowerCase())
            var newText = document.createTextNode(item[0]);
            var img = document.createElement('img');
            img.setAttribute("id", "countryFlag");
            var country = item[1].toLowerCase();
            img.src = 'https://restcountries.eu/data/' + country + '.svg';
            newCell.appendChild(newText);
            newCell.appendChild(img);
            item.shift();
            item.shift();
        }
    });
}

$.getJSON(url1, function (data) {
    $.each(data, function(key, entry) {
        if (entry.continent == "Africa") {
            africa.push(entry.name)
            africa.push(entry.code)
        } else if (entry.continent == "Asia") {
            asia.push(entry.name)
            asia.push(entry.code)
        } else if (entry.continent == "Central America") {
            centralAmerica.push(entry.name)
            centralAmerica.push(entry.code)
        } else if (entry.continent == "Europe") {
            europe.push(entry.name)
            europe.push(entry.code)
        } else if (entry.continent == "Middle East") {
            middleEast.push(entry.name)
            middleEast.push(entry.code)
        } else if (entry.continent == "North America") {
            northAmerica.push(entry.name)
            northAmerica.push(entry.code)
        } else if (entry.continent == "Pacific") {
            pac.push(entry.name)
            pac.push(entry.code)
        } else if (entry.continent == "South America") {
            southAmerica.push(entry.name)
            southAmerica.push(entry.code)
        }
    })
    var teams = [africa, asia, centralAmerica, europe, middleEast, northAmerica, pac, southAmerica];

    while (africa.length != 0 || asia.length != 0 || centralAmerica.length != 0 || europe.length != 0 || middleEast.length != 0 || northAmerica.length != 0 || pac.length != 0 || southAmerica.length != 0) {
        var tbodyRef = document.getElementById('teamTable').getElementsByTagName('tbody')[0];
        var newRow = tbodyRef.insertRow(); 

        makeCells(teams, newRow)
    }
});

var groupA = [];
var groupB = [];
var groupC = [];
var groupD = [];
var groupE = [];
var groupF = [];
var groupG = [];
var groupH = [];
var groupI = [];
var groupJ = [];

function insertToList(group, teams) {
    teams.forEach(function (item, index) {
        group.push(item["name"]);
        group.push(item["code"]);
    });
    return group;
}

$.getJSON(url2, function (data) {
    $.each(data, function(key, entry) {
        if (entry.name == "Group A") {
            a = insertToList(groupA, entry.teams)
        } else if (entry.name == "Group B") {
            b = insertToList(groupB, entry.teams)
        } else if (entry.name == "Group C") {
            c = insertToList(groupC, entry.teams)
        } else if (entry.name == "Group D") {
            d = insertToList(groupD, entry.teams)
        } else if (entry.name == "Group E") {
            e = insertToList(groupE, entry.teams)
        } else if (entry.name == "Group F") {
            f = insertToList(groupF, entry.teams)
        } else if (entry.name == "Group G") {
            g = insertToList(groupG, entry.teams)
        } else if (entry.name == "Group H") {
            h = insertToList(groupH, entry.teams)
        } 
    })

    var groups = [a, b, c, d, e, f, g, h];
    console.log("This is groups: ", groups)

    while (groupA.length != 0 || groupB.length != 0 || groupC.length != 0 || groupD.length != 0 || groupE.length != 0 || groupF.length != 0 || groupG.length != 0 || groupH.length != 0) {
        var tbodyRef = document.getElementById('groupTable').getElementsByTagName('tbody')[0];
        var newRow = tbodyRef.insertRow(); 

        makeCells(groups, newRow);
    }
});

$.getJSON(url3, function (data) {
    var i;
    for (i = 0; i < 12; i ++) {
        let grid = $('#stadium' + i.toString());
        grid.append($('<h4></h4>').text(data[i]["name"]));
        grid.append('<img src="pictures/stadiums/' + data[i]["key"] + '.jpg" class="img-fluid">');
        grid.append('<p><strong>Capacity: </strong>' + data[i]["capacity"]);
        grid.append('<p><strong>Location: </strong>' + data[i]["city"] + ', Russia');
    }

});
