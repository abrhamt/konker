# =============================================

# KONKER – Ethiopian Rummy 41

# Terraform Root Module

# Generated: November 12, 2025 12:22 AM EAT

# =============================================

terraform {

required_version = ">= 1.6.0"

required_providers {


aws = {

source = "hashicorp/aws"

version = "~> 5.0"

}

}

backend "s3" {

bucket = "konker-terraform-state"

key = "prod/terraform.tfstate"

region = "us-east-1"

dynamodb_table = "konker-terraform-locks"

encrypt = true

}

}

provider "aws" {

region = var.aws_region

}

## # =============================================

## # MODULES

## # =============================================

module "vpc" {

source = "terraform-aws-modules/vpc/aws"


version = "~> 5.0"

name = "konker-vpc"

cidr = "10.0.0.0/16"

azs = ["${var.aws_region}a", "${var.aws_region}b"]

private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]

public_subnets = ["10.0.101.0/24", "10.0.102.0/24"]

enable_nat_gateway = true

single_nat_gateway = true

}

module "ecs_backend" {

source = "./modules/ecs-backend"

vpc_id = module.vpc.vpc_id

subnet_ids = module.vpc.private_subnets

}

module "ecs_frontend" {

source = "./modules/ecs-frontend"

vpc_id = module.vpc.vpc_id

subnet_ids = module.vpc.public_subnets

}


module "rds" {

source = "./modules/rds"

vpc_id = module.vpc.vpc_id

subnet_ids = module.vpc.private_subnets

}

module "redis" {

source = "./modules/redis"

vpc_id = module.vpc.vpc_id

subnet_ids = module.vpc.private_subnets

}

module "cloudfront" {

source = "./modules/cloudfront"

domain_name = var.domain_name

}
