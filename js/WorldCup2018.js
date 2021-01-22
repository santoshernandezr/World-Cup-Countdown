const url1 = '2018/worldcup.teams.json';
const url2 = '2018/worldcup.groups.json';
const url3 = '2018/worldcup.stadiums.json';

var africa = [];
var asia = [];
var centAmerica = [];
var europe = [];
var midEast = [];
var norAmerica = [];
var pac = [];
var souAmerica = [];

function makeCells(array, newRoww) {
    array.forEach(function (item, index) {
        var newCell = newRoww.insertCell();
        if (item.length == 0) {
            var newText = document.createTextNode(" ");
        } else {
            var newText = document.createTextNode(item[0]);
            newCell.appendChild(newText)
            item.shift();
        }
    });
}

$.getJSON(url1, function (data) {
    $.each(data, function(key, entry) {
        if (entry.continent == "Africa") {
            africa.push(entry.name)
        } else if (entry.continent == "Asia") {
            asia.push(entry.name)
        } else if (entry.continent == "Central America") {
            centAmerica.push(entry.name)
        } else if (entry.continent == "Europe") {
            europe.push(entry.name)
        } else if (entry.continent == "Middle East") {
            midEast.push(entry.name)
        } else if (entry.continent == "North America") {
            norAmerica.push(entry.name)
        } else if (entry.continent == "Pacific") {
            pac.push(entry.name)
        } else if (entry.continent == "South America") {
            souAmerica.push(entry.name)
        }
    })
    var teams = [africa, asia, centAmerica, europe, midEast, norAmerica, pac, souAmerica];

    while (africa.length != 0 || asia.length != 0 || centAmerica.length != 0 || europe.length != 0 || midEast.length != 0 || norAmerica.length != 0 || pac.length != 0 || souAmerica.length != 0) {
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

function getTeams(group, teams) {
    teams.forEach(function (item, index) {
        group.push(item["name"]);
    });
    return group;
}

$.getJSON(url2, function (data) {
    $.each(data, function(key, entry) {
        if (entry.name == "Group A") {
            a = getTeams(groupA, entry.teams)
        } else if (entry.name == "Group B") {
            b = getTeams(groupB, entry.teams)
        } else if (entry.name == "Group C") {
            c = getTeams(groupC, entry.teams)
        } else if (entry.name == "Group D") {
            d = getTeams(groupD, entry.teams)
        } else if (entry.name == "Group E") {
            e = getTeams(groupE, entry.teams)
        } else if (entry.name == "Group F") {
            f = getTeams(groupF, entry.teams)
        } else if (entry.name == "Group G") {
            g = getTeams(groupG, entry.teams)
        } else if (entry.name == "Group H") {
            h = getTeams(groupH, entry.teams)
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
