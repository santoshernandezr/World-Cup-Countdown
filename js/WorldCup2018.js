const teams = '2018/worldcup.teams.json';
const groups = '2018/worldcup.groups.json';
const stadiums = '2018/worldcup.stadiums.json';

// Continent lists
var africa = [];
var asia = [];
var centralAmerica = [];
var europe = [];
var middleEast = [];
var northAmerica = [];
var pac = [];
var southAmerica = [];

// Groups lists
var groupA = [];
var groupB = [];
var groupC = [];
var groupD = [];
var groupE = [];
var groupF = [];
var groupG = [];
var groupH = [];

/**
 * This function populates the individual cell in the 'participating teams' and 'group' 
 * section. If the array is not empty then we populate the cell with the country name and
 * the flag of the respective country. Else we make an empty cell.
 * @param {List} array - List that contains a country and a country code
 * @param {List} newRoww - The cell we are dealing with.
 */
 function makeCells(array, newRoww) {
    array.forEach(function (item, index) {
        var newCell = newRoww.insertCell();
        if (item.length != 0) {
            var newText = document.createTextNode(item[0]);
            var img = document.createElement('img');
            img.setAttribute("id", "countryFlag");
            var country = item[1].toLowerCase();
            img.src = 'https://flagcdn.com/' + country + '.svg';
            newCell.appendChild(newText);
            newCell.appendChild(img);
            item.shift();
            item.shift();
            return;
        }
        var newText = document.createTextNode(" ");
    });
}

/**
 * This function takes in an empty list that will be populated with teams. These teams are in this
 * group. It will make a list of a group.
 * @param {List} group - The group which the respective team is in.
 * @param {JSON} teams - This is a JSON object which contains the teams in the group.
 */
 function makeGroup(group, teams) {
    teams.forEach(function (item) {
        group.push(item["name"]);
        group.push(item["code"]);
    });
}

/**
 * This function will take two JSON items, name, and code and put them into their corresponding continent
 * list
 * @param {List} continent - continent to which the country corresponds to.
 * @param {JSON} name - Name of the country
 * @param {JSON} code - Country code
 */
 function insertToList(continent, name, code) {
    continent.push(name);
    continent.push(code)
}

/**
 * This function makes the table and adds the elementID and the element Tag to the table. It takes
 * a list containing lists, where each sublist is a column.
 * @param {List} items - List containing lists. [[], [],...,[]]
 * @param {String} - elementID 
 * @param {String} - elementTagName 
 */
 function makeTable(items, elementID, elementTagName) {
    while (items[0].length != 0 || items[1].length != 0 || items[2].length != 0 || items[3].length != 0 || items[4].length != 0 || items[5].length != 0 || items[6].length != 0 || items[7].length != 0) {
        var tbodyRef = document.getElementById(elementID).getElementsByTagName(elementTagName)[0];
        var newRow = tbodyRef.insertRow(); 
        makeCells(items, newRow)
    }

}

/**
 * This getJSON will iterate through '2014/worldcup.teams.json' and seperate the teams into their 
 * corresponding continent. 
 */
 $.getJSON(teams, function (data) {
    $.each(data, function(key, entry) {
        if (entry.continent == "Africa") {
            insertToList(africa, entry.name, entry.code)
        } else if (entry.continent == "Asia") {
            insertToList(asia, entry.name, entry.code)
        } else if (entry.continent == "Central America") {
            insertToList(centralAmerica, entry.name, entry.code)
        } else if (entry.continent == "Europe") {
            insertToList(europe, entry.name, entry.code)
        } else if (entry.continent == "Middle East") {
            insertToList(middleEast, entry.name, entry.code)
        } else if (entry.continent == "North America") {
            insertToList(northAmerica, entry.name, entry.code)
        } else if (entry.continent == "Pacific") {
            insertToList(pac, entry.name, entry.code)
        } else if (entry.continent == "South America") {
            insertToList(southAmerica, entry.name, entry.code)
        }
    })
    var teams = [africa, asia, centralAmerica, europe, middleEast, northAmerica, pac, southAmerica];
    makeTable(teams, 'teamTable', 'tbody');
});

/**
 * This function will iterate through '2014/worldcup.groups.json' and put the teams in their
 * corresponding group.
 */
 $.getJSON(groups, function (data) {
    $.each(data, function(key, entry) {
        if (entry.name == "Group A") {      
            makeGroup(groupA, entry.teams)
        } else if (entry.name == "Group B") {
            makeGroup(groupB, entry.teams)
        } else if (entry.name == "Group C") {
            makeGroup(groupC, entry.teams)
        } else if (entry.name == "Group D") {
            makeGroup(groupD, entry.teams)
        } else if (entry.name == "Group E") {
            makeGroup(groupE, entry.teams)
        } else if (entry.name == "Group F") {
            makeGroup(groupF, entry.teams)
        } else if (entry.name == "Group G") {
            makeGroup(groupG, entry.teams)
        } else if (entry.name == "Group H") {
            makeGroup(groupH, entry.teams)
        } 
    })

    var groups = [groupA, groupB, groupC, groupD, groupE, groupF, groupG, groupH];
    makeTable(groups, 'groupTable', 'tbody');
});

$.getJSON(stadiums, function (data) {
    var i;
    for (i = 0; i < 12; i ++) {
        let grid = $('#stadium' + i.toString());
        grid.append($('<h4></h4>').text(data[i]["name"]));
        grid.append('<img src="pictures/stadiums/' + data[i]["key"] + '.jpg" class="img-fluid">');
        grid.append('<p><strong>Capacity: </strong>' + data[i]["capacity"]);
        grid.append('<p><strong>Location: </strong>' + data[i]["city"] + ', Russia');
    }

});
