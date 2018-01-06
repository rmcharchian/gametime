var games = [
    { "id": 1, "name": "Catan", "duration": 60, "maxPlayers": 6, "minPlayers": 3 },
    { "id": 2, "name": "Monopoly", "duration": 120, "maxPlayers": 6, "minPlayers": 2 },
    { "id": 3, "name": "Coup", "duration": 30, "maxPlayers": 5, "minPlayers": 2 },
    { "id": 4, "name": "Pandemic", "duration": 90, "maxPlayers": 6, "minPlayers": 3 },
];            

var numPlayers = 15;
var numRooms = 2;
var startTime = new Date("1/7/2018 8:00").getTime();
var endTime = new Date("1/7/2018 22:00").getTime();
var rooms = [];
var schedule = [];
var changeoverTime = 15; //TODO should we automatically include some buffer time?

// Assign each game to a room for the duration of this event
var currentRoom = 0;
games.forEach(game => {
    if(!rooms[currentRoom]) {
        rooms[currentRoom] = {"games": []};
    }
    rooms[currentRoom]["games"].push(game);
    currentRoom++;
    if (currentRoom >= numRooms) {
        currentRoom = 0;
    }
});

// Calculate the schedule based on room assignments and game durations
for (var i=0; i<numRooms; i++) {
    var nextGameStartTime = startTime;
    var timeRemaining = endTime - nextGameStartTime;
    schedule[i] = [];
    finished = false;
    while(!finished) {
        rooms[i]["games"].forEach(game => {
            var gameDurationMilliSeconds = game.duration * 60 * 1000;
            if (gameDurationMilliSeconds <= timeRemaining) {
                schedule[i].push({"startTime": nextGameStartTime, "game": game});
                nextGameStartTime = nextGameStartTime + gameDurationMilliSeconds;
                timeRemaining = endTime - nextGameStartTime;
            } else {
                // TODO look for smaller games before giving up
                finished = true;
            }
        })
    }
}

$(document).ready(function() {
    var results = "";
    for (var i=0; i<numRooms; i++) {
        results += "<h2>Room " + (i+1) + "</h2>";
        results += "<table><tr><th>Start Time</th><th>Game</th><th>Players</th></tr>";
        schedule[i].forEach(slot => {
            results += "<tr><td>" + new Date(slot["startTime"]).toLocaleTimeString() + "</td><td>" + slot["game"].name + "</td><td>TBD</td></tr>";
        })
        results += "</table>";
    }
    $("#results").html(results);
});
