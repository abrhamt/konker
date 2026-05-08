#!/bin/bash

# =============================================

# KONKER – Ethiopian Rummy 41

# Daily MySQL Backup Script

# Generated: November 12, 2025 12:22 AM EAT

# =============================================

set -euo pipefail

## # =============================================

## # CONFIG

## # =============================================

DB_HOST="${MYSQL_HOST:-mysql}"

DB_PORT="${MYSQL_PORT:-3306}"

DB_USER="${MYSQL_USER:-konker_user}"

DB_PASS="${MYSQL_PASSWORD:-konkerpass2025}"

DB_NAME="konker_db"

BACKUP_DIR="${BACKUP_DIR:-/backups}"


DATE=$(date +%Y%m%d_%H%M%S)

BACKUP_FILE="${BACKUP_DIR}/konker_db_${DATE}.sql.gz"

## RETENTION_DAYS=${RETENTION_DAYS:-30}

LOG_FILE="/var/log/konker-backup.log"

## # =============================================

## # LOGGING

## # =============================================

log() {

echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"

}

## # =============================================

## # PRE-CHECKS

## # =============================================

log "Starting backup for ${DB_NAME}"

if! command -v mysqldump &> /dev/null; then

log "ERROR: mysqldump not found"

exit 1

fi

mkdir -p "$BACKUP_DIR"


## # =============================================

## # DUMP & COMPRESS

## # =============================================

log "Dumping database..."

mysqldump \

--host="$DB_HOST" \

--port="$DB_PORT" \

--user="$DB_USER" \

--password="$DB_PASS" \

--single-transaction \

--routines \

--triggers \

--lock-tables=false \

--databases "$DB_NAME" | gzip > "$BACKUP_FILE"

BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)

log "Backup created: $BACKUP_FILE ($BACKUP_SIZE)"

## # =============================================

## # RETENTION

## # =============================================

log "Cleaning backups older than $RETENTION_DAYS days..."

find "$BACKUP_DIR" -name "konker_db_*.sql.gz" -mtime +$RETENTION_DAYS -delete


log "Backup completed successfully"
