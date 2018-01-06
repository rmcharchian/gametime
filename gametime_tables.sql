CREATE SCHEMA game_time;

--players table
CREATE TABLE game_time.players (
id serial PRIMARY KEY,
email varchar
);


--events table
CREATE TABLE game_time.events (
id serial PRIMARY KEY,
event_name varchar,
created_date date,
start_time numeric,
end_time numeric
);


--players events table
CREATE TABLE game_time.players_events (
player_id integer REFERENCES game_time.players(id) ON DELETE CASCADE,
event_id integer REFERENCES game_time.events(id) ON DELETE CASCADE
);

--games table
CREATE TABLE game_time.games (
id serial PRIMARY KEY,
game_title varchar,
min_player_count numeric,
max_player_count numeric,
game_runtime numeric
);

--events games table
CREATE TABLE game_time.events_games (
event_id integer REFERENCES game_time.events(id) ON DELETE CASCADE,
game_id integer REFERENCES game_time.games(id) ON DELETE CASCADE
);



