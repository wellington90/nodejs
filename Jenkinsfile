pipeline {
    agent any

    stages {
        stage('Get Source') {
            steps {
                git url: 'https://github.com/wellington90/nodejs.git', branch: 'main'
            }
        }

        stage('Docker Build Image') {
            steps {
                script {
                    def randomBuildId = UUID.randomUUID().toString()
                    def dockerapp = docker.build("w3ll1n9t0n/test-jenkins:${randomBuildId}")
                }
            }
        }

        stage('Docker Push Image') {
            steps {
                script {
                    def randomBuildId = UUID.randomUUID().toString()
                    def dockerapp = docker.build("w3ll1n9t0n/test-jenkins:${randomBuildId}")
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        dockerapp.push('latest')
                        dockerapp.push("${randomBuildId}")
                    }
                }
            }
        }
    }
}
