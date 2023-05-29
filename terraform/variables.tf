// INSTANCE
variable "region" {
  default = "eu-west-3"
}
variable "ami" {
  default = "ami-05a8450aee7da05fb"
}
variable "instance_type" {
  default = "t2.micro"
}
variable "availability_zone" {
  default = "eu-west-3a"
}
variable "availability_zone_a" {
  default = "eu-west-3a"
}
variable "availability_zone_b" {
  default = "eu-west-3b"
}

// DB
variable "db_name" {
  sensitive = true
}
variable "engine" {
  sensitive = true
}
variable "engine_version" {
  sensitive = true
}
variable "username" {
  sensitive = true
}
variable "password" {
  sensitive = true
}
variable "identifier" {
  sensitive = true
}

