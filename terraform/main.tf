terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-west-3"
}

resource "aws_vpc" "bando" {
  cidr_block       = "192.168.0.0/16"
  instance_tenancy = "default"

  enable_dns_support               = true
  enable_dns_hostnames             = true
  assign_generated_ipv6_cidr_block = false

  tags = {
    Name = "bando vpc"
  }
}

output "vpc_id" {
  value       = aws_vpc.bando.id
  description = "VPC id."
  sensitive   = false
}

