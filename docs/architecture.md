# Konker – Ethiopian Rummy 41

## System Architecture (November 12, 2025)

## ---

## High-Level Overview

[Players] → [HTTPS/WSS] → [CloudFront CDN] → [ALB] → [ECS Fargate]

│

├───→ [Frontend (React + Vite)]


└───→ [Backend (Node.js + Socket.io)]

│

├───→ [MySQL (RDS)]

└───→ [Redis (ElastiCache)]

text

## ---

## Components

| Layer | Technology | Purpose |

|------|-----------|--------|

| **CDN** | AWS CloudFront | Global edge caching, SSL termination |

| **Load Balancer** | ALB (HTTPS) | Route `/` → Frontend, `/socket.io` → Backend |

| **Frontend** | React + Vite + Tailwind | Real-time game UI |

| **Backend** | Node.js + Socket.io + Express | Game logic, rooms, turns |

| **Database** | MySQL 8.0 (RDS) | Persistent state, players, games |

| **Cache** | Redis 7 | Pub/Sub, rate limiting, session sync |

| **Monitoring** | Prometheus + Grafana + Loki | Metrics, alerts, logs |

| **CI/CD** | GitHub Actions → ECR → ECS | Zero-downtime deploys |

## ---

## Data Flow


1. **Player connects** → WSS to `/socket.io` → JWT auth
2. **Create/Join Room** → Backend → MySQL `games` + `player_hands`
3. **Game Start** → Dealer deals 11 cards → Stored in `player_hands.card_id`
4. **Turn Actions** → Draw → Place Set → Discard → Redis lock
5. **Win Check** → Stored procedure `check_winner()` → Update stats

## ---

## Security

- JWT with 7-day expiry
- PIN-based login (bcrypt)
- Rate limiting (Express)
- Input validation (Zod)
- SSL everywhere (Let's Encrypt via ACM)

## ---

## Scalability

- Horizontal: ECS auto-scale on CPU > 70%
- Redis cluster-ready
- MySQL read replicas (future)


- Stateless backend

## ---

## Local Development

```bash

docker compose up -d

# Access: [http://localhost](http://localhost)

# DB: mysql://konker_user:konkerpass2025@localhost:3306/konker_db
