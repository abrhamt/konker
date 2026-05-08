output "backend_url" {

value = module.ecs_backend.service_url

}

output "frontend_url" {

value = "https://${var.domain_name}"

}

output "database_endpoint" {

value = module.rds.endpoint

}

output "redis_endpoint" {

value = module.redis.endpoint

}
