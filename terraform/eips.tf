resource "aws_eip" "nat1" {
  depends_on = [aws_internet_gateway.bando_gw]
}

resource "aws_eip" "nat2" {
  depends_on = [aws_internet_gateway.bando_gw]
}