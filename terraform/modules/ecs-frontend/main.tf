resource "aws_ecs_cluster" "frontend" {

name = "konker-frontend-cluster"

}

resource "aws_ecs_task_definition" "frontend" {

family = "konker-frontend"

network_mode = "awsvpc"

requires_compatibilities = ["FARGATE"]

cpu = "256"

memory = "512"

container_definitions = jsonencode([{

name = "frontend"

image = "${var.ecr_repo}:latest"

portMappings = [{

containerPort = 80


protocol = "tcp"

}]

environment = [

{ name = "VITE_SOCKET_URL", value = "wss://${var.domain_name}/socket.io" }

]

}])

}

resource "aws_ecs_service" "frontend" {

name = "konker-frontend-service"

cluster = aws_ecs_cluster.frontend.id

task_definition = aws_ecs_task_definition.frontend.arn

desired_count = 1

launch_type = "FARGATE"

network_configuration {

subnets = var.subnet_ids

security_groups = [aws_security_group.frontend.id]

assign_public_ip = true

}

load_balancer {

target_group_arn = aws_lb_target_group.frontend.arn

container_name = "frontend"


container_port = 80

}

}
