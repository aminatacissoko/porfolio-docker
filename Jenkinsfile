pipeline {
    agent any

    environment {
        DOCKERHUB_USER    = "aminataci"
        IMAGE_FRONTEND    = "${DOCKERHUB_USER}/portfolio-frontend"
        IMAGE_BACKEND     = "${DOCKERHUB_USER}/portfolio-backend"
        IMAGE_TAG         = "${env.BUILD_NUMBER}"
        REMOTE_USER       = "amina"
        REMOTE_HOST       = "172.26.145.159"
        REMOTE_DIR        = "/home/amina/porfolio-docker"
        MAIL_DESTINATAIRE = "aminataci20@gmail.com"
        DOCKERHUB_CREDS   = credentials('dockerhub-credentials')
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Récupération du code source...'
                mail(
                    to: "${MAIL_DESTINATAIRE}",
                    subject: "Jenkins - Build #${env.BUILD_NUMBER} DÉMARRÉ",
                    body: """
Bonjour Amina,

Le pipeline Jenkins vient de démarrer.

Projet  : ${env.JOB_NAME}
Build   : #${env.BUILD_NUMBER}
Démarré : ${new Date()}
Lien    : ${env.BUILD_URL}

Tu recevras un autre mail à la fin du build.

-- Jenkins
                    """
                )
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                echo "Build image frontend..."
                sh """
                    docker build \
                        -t ${IMAGE_FRONTEND}:${IMAGE_TAG} \
                        -t ${IMAGE_FRONTEND}:latest \
                        ./portfolio-react
                """
            }
        }

        stage('Build Backend') {
            steps {
                echo "Build image backend..."
                sh """
                    docker build \
                        -t ${IMAGE_BACKEND}:${IMAGE_TAG} \
                        -t ${IMAGE_BACKEND}:latest \
                        ./porfolio-expessjs-mongodb
                """
            }
        }

        stage('Push Docker Hub') {
            steps {
                echo 'Envoi des images sur Docker Hub...'
                sh """
                    echo ${DOCKERHUB_CREDS_PSW} | docker login -u ${DOCKERHUB_CREDS_USR} --password-stdin
                    docker push ${IMAGE_FRONTEND}:${IMAGE_TAG}
                    docker push ${IMAGE_FRONTEND}:latest
                    docker push ${IMAGE_BACKEND}:${IMAGE_TAG}
                    docker push ${IMAGE_BACKEND}:latest
                """
            }
            post {
                always {
                    sh 'docker logout'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Déploiement sur le serveur Docker...'
                sshagent(['ssh-serveur-distant']) {
                    sh """
                        scp -o StrictHostKeyChecking=no \
                            docker-compose.prod.yml \
                            ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/docker-compose.prod.yml

                        ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} '
                            cd ${REMOTE_DIR} &&
                            docker-compose -f docker-compose.prod.yml pull &&
                            docker-compose -f docker-compose.prod.yml up -d --remove-orphans
                        '
                    """
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Nettoyage des images obsolètes...'
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            mail(
                to: "${MAIL_DESTINATAIRE}",
                subject: "Jenkins - Build #${env.BUILD_NUMBER} RÉUSSI",
                body: """
Bonjour Amina,

Le pipeline Jenkins s'est terminé avec succès !

Projet  : ${env.JOB_NAME}
Build   : #${env.BUILD_NUMBER}
Statut  : SUCCÈS
Terminé : ${new Date()}
Lien    : ${env.BUILD_URL}

Images publiées sur Docker Hub :
  - aminataci/portfolio-frontend:${env.BUILD_NUMBER}
  - aminataci/portfolio-backend:${env.BUILD_NUMBER}

-- Jenkins
                """
            )
        }
        failure {
            mail(
                to: "${MAIL_DESTINATAIRE}",
                subject: "Jenkins - Build #${env.BUILD_NUMBER} ÉCHOUÉ",
                body: """
Bonjour Amina,

Le pipeline Jenkins a échoué.

Projet  : ${env.JOB_NAME}
Build   : #${env.BUILD_NUMBER}
Statut  : ÉCHEC
Terminé : ${new Date()}
Lien    : ${env.BUILD_URL}

Clique sur le lien puis va dans Console Output pour voir l'erreur.

-- Jenkins
                """
            )
        }
        always {
            cleanWs()
        }
    }
}
