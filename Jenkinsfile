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
                    dockerapp = docker.build("w3ll1n9t0n/test-jenkins:${randomBuildId}")
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
        
        stage('Stop and Remove Running Container') {
            steps {
                script {
                    def dockerContainerName = "my-node-app"  // Set your container name here
                    sh "docker stop $dockerContainerName || true"  // Stop and ignore errors if container is not running
                    sh "docker rm $dockerContainerName || true"    // Remove and ignore errors if container does not exist
                }
            }
        }

        stage('Run Docker Image') {
            steps {
                script {
                    def dockerRunCmd = "docker run -d -p 5000:5000 --name my-node-app w3ll1n9t0n/test-jenkins:${env.RANDOM_BUILD_ID}"
                    sh dockerRunCmd
                }
            }
        }
    }
}
