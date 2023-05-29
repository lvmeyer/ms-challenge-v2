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

resource "aws_instance" "products_instance" {
  ami               = "ami-05a8450aee7da05fb"
  instance_type     = "t2.micro"
  availability_zone = "eu-west-3a"

  subnet_id                   = aws_subnet.bando_subnet_a.id
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.bando_sg.id]
  tags = {
    Name = "Products Instance"
  }
}

// Create VPC
resource "aws_vpc" "bando_vpc" {
  cidr_block = "10.0.0.0/16"

  enable_dns_hostnames = true
  tags = {
    Name = "Bando VPC"
  }
}

// Create Subnet
resource "aws_subnet" "bando_subnet_a" {
  vpc_id     = aws_vpc.bando_vpc.id
  cidr_block = "10.0.0.0/24"

  availability_zone = "eu-west-3a"
  tags = {
    Name = "Bando Subnet 1"
  }
}

resource "aws_subnet" "bando_subnet_b" {
  vpc_id     = aws_vpc.bando_vpc.id
  cidr_block = "10.0.16.0/24"

  availability_zone = "eu-west-3b"
  tags = {
    Name = "Bando Subnet 2"
  }
}

resource "aws_internet_gateway" "bando_gw" {
  vpc_id = aws_vpc.bando_vpc.id

  tags = {
    Name = "Bando GW"
  }
}

resource "aws_route_table" "bando_rt" {
  vpc_id = aws_vpc.bando_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.bando_gw.id
  }
  # route {
  #   ipv6_cidr_block        = "::/0"
  #   egress_only_gateway_id = "${aws_egress_only_internet_gateway.foo.id}"
  # }
  tags = {
    Name = "Bando RT"
  }
}

// Associate subnet with route table
resource "aws_route_table_association" "bando_rt_association" {
  subnet_id      = aws_subnet.bando_subnet_a.id
  route_table_id = aws_route_table.bando_rt.id
}

resource "aws_security_group" "bando_sg" {
  name   = "bando_sg"
  vpc_id = aws_vpc.bando_vpc.id
  # description = "Allow TLS inbound traffic"

  ingress {
    description      = "443 from VPC"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "80 from VPC"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "SSH from VPC"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow_tls"
  }
}

// Create Subnet for DB
resource "aws_subnet" "db_subnet_a" {
  vpc_id     = aws_vpc.bando_vpc.id
  cidr_block = "10.0.24.0/24"

  availability_zone = "eu-west-3a"
  tags = {
    Name = "DB Subnet 1"
  }
}

resource "aws_subnet" "db_subnet_b" {
  vpc_id     = aws_vpc.bando_vpc.id
  cidr_block = "10.0.32.0/24"

  availability_zone = "eu-west-3b"
  tags = {
    Name = "DB Subnet 2"
  }
}

resource "aws_security_group" "db_sg" {
  name        = "DB SG"
  description = "Allow DB traffic"
  vpc_id      = aws_vpc.bando_vpc.id

  ingress {
    description = "DB from VPC"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    # security_groups = [aws_security_group.bando_sg.id]
  }

  tags = {
    Name = "Database Security Group"
  }
}

resource "aws_db_subnet_group" "dbpdt-subnet-group" {
  name       = "db-subnet-group"
  subnet_ids = [aws_subnet.db_subnet_a.id, aws_subnet.db_subnet_b.id]

  tags = {
    Name = "My DB subnet group"
  }
}

resource "aws_db_instance" "db_instance" {
  db_name                = "dbpdt"
  engine                 = "postgres"
  engine_version         = "14.6"
  multi_az               = false
  identifier             = "pdt-rds-instance"
  username               = "dbproducts"
  password               = "dbproducts"
  instance_class         = "db.t3.micro"
  allocated_storage      = 10
  db_subnet_group_name   = aws_db_subnet_group.dbpdt-subnet-group.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  availability_zone      = "eu-west-3a"
  skip_final_snapshot    = true
}