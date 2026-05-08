resource "aws_db_instance" "konker" {

identifier = "konker-db"

engine = "mysql"

engine_version = "8.0"

instance_class = "db.t3.micro"

allocated_storage = 20

storage_type = "gp2"

username = "konker_user"

password = var.mysql_password

parameter_group_name = "default.mysql8.0"

db_subnet_group_name = aws_db_subnet_group.main.name

vpc_security_group_ids = [aws_security_group.rds.id]

publicly_accessible = false

skip_final_snapshot = true

}
