resource "aws_ecs_cluster" "backend" {

name = "konker-backend-cluster"

}

resource "aws_ecs_task_definition" "backend" {

family = "konker-backend"

network_mode = "awsvpc"

requires_compatibilities = ["FARGATE"]

cpu = "512"

memory = "1024"

container_definitions = jsonencode([{

name = "backend"

image = "${var.ecr_repo}:latest"

portMappings = [{

containerPort = 3001

protocol = "tcp"

}]

environment = [

{ name = "MYSQL_URL", value =
"mysql://konker_user:${var.mysql_password}@${var.db_endpoint}:3306/konker_db" },


{ name = "REDIS_URL", value =
"redis://default:${var.redis_password}@${var.redis_endpoint}:6379" },

{ name = "JWT_SECRET", value = var.jwt_secret }

]

logConfiguration = {

logDriver = "awslogs"

options = {

"awslogs-group" = "/ecs/konker-backend"

"awslogs-region" = var.aws_region

"awslogs-stream-prefix" = "backend"

}

}

}])

}

resource "aws_ecs_service" "backend" {

name = "konker-backend-service"

cluster = aws_ecs_cluster.backend.id

task_definition = aws_ecs_task_definition.backend.arn

desired_count = 2

launch_type = "FARGATE"

network_configuration {

subnets = var.subnet_ids

security_groups = [aws_security_group.backend.id]


assign_public_ip = false

}

}
