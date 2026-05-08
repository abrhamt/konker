---

**File 32 / 49**

`docs/api.md` – **API & Socket.io Event Reference**

```markdown

# Konker API & Socket.io Events

## ---


## Authentication

### `POST /api/auth/login`

```json

{ "nickname": "Alpha", "pin": "1234" }

→ { "token": "jwt...", "player_id": "1" }

Socket.io Events (Client → Server)

Event Payload Description

create_room { nickname } Host creates game

join_room { room_code, nickname } Join by code

ready_toggle { is_ready } Ready up

start_game {} Host starts

draw_card { source, proposed_set?, proposed_type? } Draw from deck/discard

place_set { type, cards } Lay down 41+

discard_card { card_id, is_final_move } End turn

Socket.io Events (Server → Client)

Event Payload Description

state:init { state, your_player_id } Full game state

state:update { diff } Partial update

player_joined { player } New player

game_started { dealer_id } Game begins

state:turn { current_player, timer } Turn start


game_ended { winner_id } Win declared

REST Endpoints

Method Endpoint Description

GET /api/stats/leaderboard Top 100 players

GET /api/stats/player/:id Player stats
