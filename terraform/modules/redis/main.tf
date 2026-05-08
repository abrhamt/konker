resource "aws_elasticache_cluster" "konker" {

cluster_id = "konker-redis"

engine = "redis"

node_type = "cache.t3.micro"

num_cache_nodes = 1

parameter_group_name = "default.redis7"

port = 6379

subnet_group_name = aws_elasticache_subnet_group.main.name

security_group_ids = [aws_security_group.redis.id]

}

Generating next 29 files...

Next Batch (21–30):

terraform/modules/cloudfront/main.tf

terraform/modules/route53/main.tf

terraform/modules/iam/main.tf

ansible/playbooks/deploy.yml

helm/charts/konker/Chart.yaml


helm/charts/konker/values.yaml

k8s/namespace.yaml

k8s/deployment-backend.yaml

k8s/deployment-frontend.yaml

k8s/ingress.yaml

Shall I continue with File 21 / 49 (terraform/modules/cloudfront/main.tf)?

Reply: Continue

Continue 21 to 30 one by one
