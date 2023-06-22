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

resource "aws_db_instance" "db_instance" {
  db_name                = "bando"
  engine                 = "postgres"
  engine_version         = "14.6"
  multi_az               = false
  identifier             = "pdt-rds-instance"
  username               = var.db_username
  password               = var.db_password
  instance_class         = "db.t3.micro"
  allocated_storage      = 10
  db_subnet_group_name   = aws_db_subnet_group.dbpdt-subnet-group.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  availability_zone      = "eu-west-3a"
  skip_final_snapshot    = true
}