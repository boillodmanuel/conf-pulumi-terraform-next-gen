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

// CODE 

locals {
  is_prod = terraform.workspace == "prod" ? true : false
}

resource "aws_iam_user" "users" {
  count = local.is_prod ? 1 : 0
  name  = "bob"
}

