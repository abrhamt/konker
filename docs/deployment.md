---

**File 33 / 49**

`docs/deployment.md` – **Deployment Guide**

```markdown

# Deployment Guide

## ---

## Prerequisites

- AWS Account
- Domain (`konker.et`)


- GitHub Repository
- Docker
- Terraform 1.6+

## ---

## ## 1. DNS & SSL

```bash

# Route53: Create hosted zone for konker.et

# ACM: Request certificate for *.konker.et

2. Terraform Deploy

bash

cd terraform

terraform init

terraform plan -var="mysql_password=..." -var="jwt_secret=..."

terraform apply

3. CI/CD (GitHub Actions)

Push to main → Build → Push to ECR → Update ECS task

Cache invalidation on CloudFront


4. Monitoring

bash

# Grafana: https://grafana.konker.et

# Prometheus: https://prometheus.konker.et

5. Backup

bash

# Daily at 2 AM

0 2 * * * /scripts/backup-db.sh
