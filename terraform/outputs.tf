output "instance_public_ip" {
  value = aws_eip.portfolio_eip.public_ip
}

output "jenkins_url" {
  value = "http://${aws_eip.portfolio_eip.public_ip}:8080"
}

output "sonarqube_url" {
  value = "http://${aws_eip.portfolio_eip.public_ip}:9000"
}

output "ssh_command" {
  value = "ssh -i ~/.ssh/portfolio-key.pem ubuntu@${aws_eip.portfolio_eip.public_ip}"
}