sql

## -- =============================================

-- KONKER – Ethiopian Rummy 41

-- Seed Data for Local Development

-- Generated: November 12, 2025 12:22 AM EAT

-- =============================================

USE konker_db;

-- Players

INSERT INTO players (nickname, pin_hash) VALUES

('Alpha', '$2b$10$abc123hashedpinalpha'),

('Beta', '$2b$10$def456hashedpinbeta'),

('Gamma', '$2b$10$ghi789hashedpingamma')

ON DUPLICATE KEY UPDATE nickname = nickname;

-- Sample Game (WAITING)

SET @host_id = (SELECT player_id FROM players WHERE nickname = 'Alpha');

CALL init_game('KNK-TEST', @host_id, 123456789);

-- Join others

INSERT INTO player_hands (game_id, player_id, seat_position, is_ready, is_host)


## SELECT

(SELECT game_id FROM games WHERE room_code = 'KNK-TEST'),

player_id,

ROW_NUMBER() OVER (ORDER BY nickname) - 1,

1,

(nickname = 'Alpha')

FROM players

WHERE nickname IN ('Beta', 'Gamma')

ON DUPLICATE KEY UPDATE is_ready = 1;
