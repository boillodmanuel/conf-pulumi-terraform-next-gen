terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.0.0"
}

provider "aws" {
  region = "eu-west-3"
}

variable "env" {
  description = "env: dev or prod"
}

// CODE 

resource "aws_iam_user" "users" {
  for_each = toset(["Todd", "James", "Alice", "Dottie"])
  name     = each.key
}