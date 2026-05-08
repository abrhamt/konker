variable "aws_region" {

description = "AWS region"


type = string

default = "us-east-1"

}

variable "domain_name" {

description = "Domain name for Konker"

type = string

default = "konker.et"

}

variable "mysql_password" {

description = "MySQL root password"

type = string

sensitive = true

}

variable "redis_password" {

description = "Redis password"

type = string

sensitive = true

}

variable "jwt_secret" {

description = "JWT secret"


type = string

sensitive = true

}
