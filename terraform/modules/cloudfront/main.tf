# =============================================

# KONKER – CloudFront Distribution

# Generated: November 12, 2025 12:24 AM EAT

# =============================================

resource "aws_cloudfront_origin_access_identity" "oai" {

comment = "OAI for Konker frontend"

}


resource "aws_cloudfront_distribution" "konker" {

enabled = true

is_ipv6_enabled = true

comment = "Konker frontend CDN"

default_root_object = "index.html"

aliases = [var.domain_name]

origin {

domain_name = aws_lb.frontend.dns_name

origin_id = "ALBFrontend"

custom_origin_config {

http_port = 80

https_port = 443

origin_protocol_policy = "https-only"

origin_ssl_protocols = ["TLSv1.2"]

}

}

default_cache_behavior {

allowed_methods = ["GET", "HEAD", "OPTIONS"]

cached_methods = ["GET", "HEAD"]

target_origin_id = "ALBFrontend"


compress = true

viewer_protocol_policy = "redirect-to-https"

forwarded_values {

query_string = false

cookies {

forward = "none"

}

}

min_ttl = 0

default_ttl = 3600

max_ttl = 86400

}

ordered_cache_behavior {

path_pattern = "/socket.io/*"

allowed_methods = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]

cached_methods = ["GET", "HEAD"]

target_origin_id = "ALBBackend"

forwarded_values {

query_string = true

headers = ["*"]


cookies {

forward = "all"

}

}

min_ttl = 0

default_ttl = 0

max_ttl = 0

compress = true

viewer_protocol_policy = "wss"

}

restrictions {

geo_restriction {

restriction_type = "none"

}

}

viewer_certificate {

acm_certificate_arn = var.acm_certificate_arn

ssl_support_method = "sni-only"

minimum_protocol_version = "TLSv1.2_2021"

}


tags = {

Name = "konker-cdn"

}

}
