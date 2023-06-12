# Public subnets
resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.bando.id
  cidr_block              = "192.168.0.0/18"
  availability_zone       = "eu-west-3a"
  map_public_ip_on_launch = true

  tags = {
    Name                        = "public-eu-west-3a"
    "kubernetes.io/cluster/eks" = "shared"
    "kubernetes.io/role/elb"    = 1
  }
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.bando.id
  cidr_block              = "192.168.64.0/18"
  availability_zone       = "eu-west-3b"
  map_public_ip_on_launch = true

  tags = {
    Name                        = "public-eu-west-3b"
    "kubernetes.io/cluster/eks" = "shared"
    "kubernetes.io/role/elb"    = 1
  }
}

# Private subnets
resource "aws_subnet" "private_1" {
  vpc_id                  = aws_vpc.bando.id
  cidr_block              = "192.168.128.0/18"
  availability_zone       = "eu-west-3a"
  map_public_ip_on_launch = true

  tags = {
    Name                              = "private-eu-west-3a"
    "kubernetes.io/cluster/eks"       = "shared"
    "kubernetes.io/role/internal-elb" = 1
  }
}

resource "aws_subnet" "private_2" {
  vpc_id                  = aws_vpc.bando.id
  cidr_block              = "192.168.192.0/18"
  availability_zone       = "eu-west-3b"
  map_public_ip_on_launch = true

  tags = {
    Name                              = "private-eu-west-3b"
    "kubernetes.io/cluster/eks"       = "shared"
    "kubernetes.io/role/internal-elb" = 1
  }
}