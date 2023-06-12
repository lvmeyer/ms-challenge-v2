resource "aws_route_table" "public" {
  vpc_id = aws_vpc.bando.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.bando_gw.id
  }

  tags = {
    Name = "Public"
  }
}

resource "aws_route_table" "private1" {
  vpc_id = aws_vpc.bando.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.gw1.id
  }

  tags = {
    Name = "Private 1"
  }
}

resource "aws_route_table" "private2" {
  vpc_id = aws_vpc.bando.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.gw2.id
  }

  tags = {
    Name = "Private 2"
  }
}