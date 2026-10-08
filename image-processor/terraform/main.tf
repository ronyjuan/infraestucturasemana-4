provider "aws" {
  region = "us-east-1"
}

locals {
  env = terraform.workspace
suffix = "lujan-upao-v2"
}

resource "aws_s3_bucket" "images_bucket" {
  bucket        = "image-processor-${local.env}-images-${local.suffix}"
  force_destroy = true 
}

resource "aws_sqs_queue" "image_queue" {
  name = "image-processor-${local.env}-image-queue"
}   