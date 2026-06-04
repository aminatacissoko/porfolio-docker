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
                echo 'Lancement de l\'analyse exclusive sur le code source...'
                script {
                    def scannerHome = tool 'sonar-scanner'
                    
                    withCredentials([string(credentialsId: 'token-SonarQub', variable: 'MY_SONAR_TOKEN')]) {
                        withSonarQubeEnv('SonarQube-Local') {
                            withEnv(["SONAR_SCANNER_OPTS=-Xmx1024m -Dfile.encoding=UTF-8"]) {
                                // 👇 MODIFICATION : On cible uniquement vos dossiers de code (React et Express) et on désactive les capteurs serveurs
                                bat "${scannerHome}/bin/sonar-scanner -Dsonar.token=${MY_SONAR_TOKEN} -Dsonar.projectKey=\"portefeuille-de-projets\" -Dsonar.projectName=\"portefeuille de projets\" -Dsonar.sources=\"porfolio-expressjs-mongodb,portfolio-react\" -Dsonar.iac.activated=false"
                            }
                        }
                    }
                }
            }
        }

        stage('Contrôle Qualité (Quality Gate)') {
            steps {
                echo 'Attente du retour de SonarQube (Webhook)...'
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker') {
            steps {
                echo 'Mise à jour et reconstruction ciblée de l\'application...'
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
