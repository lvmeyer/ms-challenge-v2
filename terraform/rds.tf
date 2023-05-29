
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
    cidr_blocks = ["0.0.0.0/0"]
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
  db_name                = var.db_name
  engine                 = var.engine
  engine_version         = var.engine_version
  multi_az               = false
  identifier             = var.identifier
  username               = var.username
  password               = var.password
  instance_class         = "db.t3.micro"
  allocated_storage      = 10
  db_subnet_group_name   = aws_db_subnet_group.dbpdt-subnet-group.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  availability_zone      = "eu-west-3a"
  skip_final_snapshot    = true
}