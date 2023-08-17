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
                    env.RANDOM_BUILD_ID = randomBuildId  // Store the variable in environment
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
        
        stage('Wait for 15 Seconds') {
            steps {
                script {
                    sleep 15  // Wait for 15 seconds
                }
            }
        }

        stage('Run Docker Image') {
            steps {
                script {
                    def dockerRunCmd = "docker run -d -p 5000:5000 w3ll1n9t0n/test-jenkins:${env.RANDOM_BUILD_ID}"
                    sh dockerRunCmd
                }
            }
        }
    }
}
