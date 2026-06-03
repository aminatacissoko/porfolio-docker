pipeline {
    agent any

    stages {
        stage('Notification début') {
            steps {
                emailext(
                    to: 'aminataci20@gmail.com',
                    subject: "🚀 Build DÉMARRÉ - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: "Le build ${env.BUILD_NUMBER} vient de démarrer.\n\nURL: ${env.BUILD_URL}"
                )
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker') {
            steps {
                bat 'docker-compose down'
                bat 'docker-compose up --build -d'
            }
        }
    }

    post {
        success {
            emailext(
                to: 'aminataci20@gmail.com',
                subject: "✅ Build RÉUSSI - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Le build ${env.BUILD_NUMBER} s'est terminé avec succès.\n\nURL: ${env.BUILD_URL}"
            )
        }
        failure {
            emailext(
                to: 'aminataci20@gmail.com',
                subject: "❌ Build ÉCHOUÉ - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Le build ${env.BUILD_NUMBER} a échoué.\n\nURL: ${env.BUILD_URL}"
            )
        }
    }
}