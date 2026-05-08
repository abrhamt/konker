# =============================================

# KONKER – IAM Roles

# Generated: November 12, 2025 12:24 AM EAT

# =============================================

resource "aws_iam_role" "ecs_task_execution" {

name = "konker-ecs-task-execution-role"

assume_role_policy = jsonencode({

Version = "2012-10-17"

Statement = [{

Action = "sts:AssumeRole"

Effect = "Allow"

Principal = {

Service = "ecs-tasks.amazonaws.com"

}

}]

})

}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {


role = aws_iam_role.ecs_task_execution.name

policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"

}

resource "aws_iam_role" "ecs_task" {

name = "konker-ecs-task-role"

assume_role_policy = jsonencode({

Version = "2012-10-17"

Statement = [{

Action = "sts:AssumeRole"

Effect = "Allow"

Principal = {

Service = "ecs-tasks.amazonaws.com"

}

}]

})

}

resource "aws_iam_policy" "ecs_task_secrets" {

name = "konker-ecs-task-secrets"

policy = jsonencode({

Version = "2012-10-17"


Statement = [

{

Effect = "Allow"

Action = [

"ssm:GetParameters",

"secretsmanager:GetSecretValue"

]

Resource = "*"

}

]

})

}

resource "aws_iam_role_policy_attachment" "ecs_task_secrets" {

role = aws_iam_role.ecs_task.name

policy_arn = aws_iam_policy.ecs_task_secrets.arn

}
