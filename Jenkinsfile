pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                bat 'docker-compose up --build -d'
            }
        }
    }

    post {
        always {
            emailext(
                to: 'aminataci20@gmail.com',
                subject: "Jenkins Build ${currentBuild.result} - ${env.JOB_NAME}",
                body: """
                    Build ${currentBuild.result}
                    Job: ${env.JOB_NAME}
                    Build Number: ${env.BUILD_NUMBER}
                    URL: ${env.BUILD_URL}
                """
            )
        }
        started {
            emailext(
                to: 'aminataci20@gmail.com',
                subject: "Jenkins Build DÉMARRÉ - ${env.JOB_NAME}",
                body: "Le build ${env.BUILD_NUMBER} vient de démarrer."
            )
        }
    }
}