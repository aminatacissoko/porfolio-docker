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

        stage('Analyse SonarQube') {
            steps {
                echo 'Lancement de l\'analyse de qualité...'
                script {
                    // Récupère l'outil automatique "sonar-scanner" configuré dans Jenkins Tools
                    def scannerHome = tool 'sonar-scanner'
                    
                    // Utilisation sécurisée des identifiants Jenkins
                    withCredentials([string(credentialsId: 'token-SonarQub', variable: 'MY_SONAR_TOKEN')]) {
                        withSonarQubeEnv('SonarQube-Local') {
                            // Injection sécurisée du Token et des clés du projet SonarQube
                            bat "${scannerHome}/bin/sonar-scanner -Dsonar.token=${MY_SONAR_TOKEN} -Dsonar.projectKey=\"portefeuille de projets\" -Dsonar.projectName=\"portefeuille de projets\""
                        }
                    }
                }
            }
        }

        stage('Contrôle Qualité (Quality Gate)') {
            steps {
                echo 'Attente du retour de SonarQube (Webhook)...'
                // Jenkins attend le feu vert du conteneur SonarQube avant de déployer
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker') {
            steps {
                echo 'Mise à jour et reconstruction ciblée de l\'application...'
                // Relance et recompile uniquement l'application de votre portfolio
                bat 'docker-compose up --build -d frontend backend mongodb'
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
