pipeline {
    agent any

    stages {

        

        stage('Install Backend') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build || echo "No build step"'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    docker.build("vyapari-app")
                }
            }
        }

        stage('Run App') {
    steps {
        bat 'docker stop vyapari-container || exit 0'
        bat 'docker rm vyapari-container || exit 0'
        bat 'docker run -d -p 3000:3000 --name vyapari-container vyapari-app'
    }
}
    }
}
