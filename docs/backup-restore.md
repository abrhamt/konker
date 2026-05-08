---

**File 35 / 49**

`docs/backup-restore.md` – **Backup & Disaster Recovery**

```markdown

# Backup & Restore

## ---

## Daily Backup

- Script: `scripts/backup-db.sh`
- Location: `/backups/konker_db_YYYYMMDD_HHMMSS.sql.gz`


- Retention: 30 days

## ---

## Restore

```bash

./scripts/restore-db.sh /backups/konker_db_20251101_020000.sql.gz

Disaster Recovery

Restore DB from latest backup

Redeploy ECS tasks

Invalidate CloudFront cache

Verify via Grafana
