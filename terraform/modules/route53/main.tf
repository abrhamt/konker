# =============================================

# KONKER – Route53 DNS

# Generated: November 12, 2025 12:24 AM EAT

# =============================================

data "aws_route53_zone" "main" {

name = "${var.domain_name}."

private_zone = false

}

resource "aws_route53_record" "www" {

zone_id = data.aws_route53_zone.main.zone_id

name = "www.${var.domain_name}"

type = "CNAME"

ttl = 300


records = [aws_cloudfront_distribution.konker.domain_name]

}

resource "aws_route53_record" "root" {

zone_id = data.aws_route53_zone.main.zone_id

name = var.domain_name

type = "A"

alias {

name = aws_cloudfront_distribution.konker.domain_name

zone_id = aws_cloudfront_distribution.konker.hosted_zone_id

evaluate_target_health = false

}

}

resource "aws_route53_record" "grafana" {

zone_id = data.aws_route53_zone.main.zone_id

name = "grafana.${var.domain_name}"

type = "CNAME"

ttl = 300

records = [aws_lb.monitoring.dns_name]

}
