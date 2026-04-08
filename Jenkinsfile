pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/VipulChoudhary-cmd/Vyapari.git'
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build || echo "No build step"'
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
                script {
                    docker.run("-d -p 3000:3000 vyapari-app")
                }
            }
        }
    }
}