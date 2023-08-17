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
    }
}
