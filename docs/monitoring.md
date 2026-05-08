---

**File 34 / 49**

`docs/monitoring.md` – **Monitoring & Alerting**

```markdown

# Monitoring Stack


## ---

## Grafana Dashboards

- **Konker Overview**: Active games, connections, latency
- **Backend Health**: HTTP errors, turn timeouts
- **Database**: MySQL queries, connections
- **Redis**: Memory, eviction

## ---

## Alert Rules (Prometheus)

```yaml

- alert: BackendDown

expr: up{job="backend"} == 0

for: 1m

severity: critical

- alert: HighLatency

expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2

for: 2m

severity: warning


Log Queries (Loki)

logql

{app="konker"} |= "ERROR"

{app="konker"} |= "timeout"
