#!/bin/bash

# =============================================

# KONKER – Ethiopian Rummy 41

# Database Restore Script

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


## BACKUP_FILE="${1:-}"

LOG_FILE="/var/log/konker-restore.log"

## # =============================================

## # LOGGING

## # =============================================

log() {

echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"

}

## # =============================================

## # VALIDATION

## # =============================================

if [ -z "$BACKUP_FILE" ]; then

log "Usage: $0 <backup-file.sql.gz>"

exit 1

fi

if [! -f "$BACKUP_FILE" ]; then

log "ERROR: Backup file not found: $BACKUP_FILE"

exit 1

fi


## # =============================================

## # RESTORE

## # =============================================

log "Starting restore from $BACKUP_FILE"

log "Dropping and recreating database..."

mysql \

--host="$DB_HOST" \

--port="$DB_PORT" \

--user="$DB_USER" \

--password="$DB_PASS" \

-e "DROP DATABASE IF EXISTS $DB_NAME; CREATE DATABASE $DB_NAME
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

log "Restoring data..."

gunzip < "$BACKUP_FILE" | mysql \

--host="$DB_HOST" \

--port="$DB_PORT" \

--user="$DB_USER" \

--password="$DB_PASS" \

"$DB_NAME"

log "Restore completed successfully"
