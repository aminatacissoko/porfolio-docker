variable "aws_region" {
  description = "Région AWS"
  type        = string
  default     = "eu-west-3"
}

variable "instance_type" {
  description = "Type d'instance EC2"
  type        = string
  default     = "t2.medium"
}

variable "key_name" {
  description = "Nom de la key pair AWS"
  type        = string
  default     = "portfolio-key"
}

variable "my_ip" {
  description = "Ton IP publique en /32"
  type        = string
}