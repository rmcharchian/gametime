var games = [
    { "id": 1, "name": "Catan", "duration": 60, "maxPlayers": 6, "minPlayers": 3 },
    { "id": 2, "name": "Monopoly", "duration": 120, "maxPlayers": 6, "minPlayers": 2 },
    { "id": 3, "name": "Pandemic", "duration": 90, "maxPlayers": 6, "minPlayers": 3 },
    { "id": 4, "name": "Coup", "duration": 30, "maxPlayers": 5, "minPlayers": 2 },
];            

var numPlayers = 15;
var numRooms = 2;
var startTime = new Date("1/7/2018 8:00").getTime();
var endTime = new Date("1/7/2018 22:00").getTime();

var rooms = [];
var schedule = new Array();

var players = [];
for (var i=0; i<numPlayers; i++) {
    players[i] = { "name": "Player " + (i + 1), "busyUntil": startTime, "used": false };
}

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
    finished = false;
    while(!finished) {
        rooms[i]["games"].forEach(game => {
            var gameDurationMilliSeconds = game.duration * 60 * 1000;
            if (gameDurationMilliSeconds <= timeRemaining) {
                schedule.push({"startTime": nextGameStartTime, "game": game, "players": [], room: i});
                nextGameStartTime = nextGameStartTime + gameDurationMilliSeconds;
                timeRemaining = endTime - nextGameStartTime;
            } else {
                // TODO look for shorter games before giving up
                finished = true;
            }
        })
    }

}

schedule.sort(function(a,b) {
    return a.startTime - b.startTime;
});

// Assign players to each schedule slot
schedule.forEach(slot => {
    attempts = 0; // limit attempts so we don't get into an infinite loop!
    lastPlayer = -1;
    while (slot["players"].length < slot["game"].maxPlayers && attempts < 4) {
        foundPlayer = false;
        for (var i=lastPlayer+1; i<players.length; i++) {
            if (!players[i].used && (slot["startTime"] >= players[i].busyUntil)) {
                slot["players"].push(players[i].name);
                players[i].busyUntil = slot["startTime"] + slot["game"].duration * 60 * 1000;
                players[i].used = true;
                foundPlayer = true;
                lastPlayer = i;
                break;
            }
        }
        if (!foundPlayer) {
            resetUsedFlags(players);
            attempts++;
            lastPlayer = -1;
        }
    }
});

function resetUsedFlags(players) {
    players.forEach(player => {
        player.used = false;
    });
}

$(document).ready(function() {
    var results = "";
    var rooms = [];
    for (var i=0; i<numRooms; i++) {
        rooms[i] = "<h2>Room " + (i+1) + "</h2>";
        rooms[i] += "<table><tr><th>Start Time</th><th>Game</th><th>Players</th></tr>";
        schedule.forEach(slot => {
            if (slot["room"] == i) {
                rooms[i] += "<tr><td>" 
                        + new Date(slot["startTime"]).toLocaleTimeString() 
                        + "</td><td>" 
                        + slot["game"].name 
                        + "</td><td>" 
                        + slot["players"].join(", ") 
                        + "</td></tr>";
            }
        })
        rooms[i] += "</table>";
    }
    $("#results").html(rooms.join(""));
});