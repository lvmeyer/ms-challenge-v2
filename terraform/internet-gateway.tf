resource "aws_internet_gateway" "bando_gw" {
  vpc_id = aws_vpc.bando.id

  tags = {
    Name = "bando gw"
  }
}