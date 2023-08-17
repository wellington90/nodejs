pipeline {
    agent any

    environment {
        // Generate the random build ID
        RANDOM_BUILD_ID = UUID.randomUUID().toString()
        DOCKER_IMAGE_TAG = "w3ll1n9t0n/test-jenkins:${env.RANDOM_BUILD_ID}"
    }

    stages {
        stage('Get Source') {
            steps {
                git url: 'https://github.com/wellington90/nodejs.git', branch: 'main'
            }
        }

        stage('Docker Build Image') {
            steps {
                script {
                    def dockerapp = docker.build(env.DOCKER_IMAGE_TAG)
                }
            }
        }

        stage('Docker Push Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        dockerapp.push('latest')
                        dockerapp.push(env.RANDOM_BUILD_ID)
                    }
                }
            }
        }
        
        stage('Run Docker Image') {
            steps {
                script {
                    def dockerRunCmd = "docker run -d -p 5000:5000 ${env.DOCKER_IMAGE_TAG}"
                    sh dockerRunCmd
                }
            }
        }
    }
}
