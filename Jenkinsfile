pipeline {
    agent any

    environment {
        IMAGE_NAME     = "coding-platform"
        CONTAINER_NAME = "coding-platform-container"
        APP_PORT       = "3000"   // ✅ changed from 5173 to avoid port conflict
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/23501a1214-wq/Coding-platform.git'  // ✅ updated repo
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test: Verify Project Structure') {
            steps {
                bat '''
                    IF NOT EXIST src exit /b 1
                    IF NOT EXIST index.html exit /b 1
                    IF NOT EXIST vite.config.js exit /b 1
                    IF NOT EXIST src\\pages\\Login.jsx exit /b 1
                    IF NOT EXIST src\\pages\\Leaderboard.jsx exit /b 1
                    IF NOT EXIST src\\pages\\Signup.jsx exit /b 1
                '''
            }
        }

        stage('Test: Login Validation') {
            steps {
                bat 'npx jest src/pages/Login.test.js --no-coverage --verbose'
            }
        }

        stage('Test: Leaderboard Order') {
            steps {
                bat 'npx jest src/pages/Leaderboard.test.js --no-coverage --verbose'
            }
        }

        stage('Test: Signup Validation') {
            steps {
                bat 'npx jest src/pages/Signup.test.js --no-coverage --verbose'
            }
        }

        stage('Test: Full Suite + Coverage') {
            steps {
                bat 'npx jest --coverage --coverageReporters=lcov --coverageReporters=text --verbose --testPathIgnorePatterns="src/App.test.js"'
            }
        }

        stage('Test: Build Verification') {
            steps {
                bat 'npm run build'
                bat 'IF NOT EXIST dist exit /b 1'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Run Container') {
            steps {
                bat '''
                    docker stop %CONTAINER_NAME% 2>nul
                    docker rm %CONTAINER_NAME% 2>nul
                    FOR /F "tokens=5" %%a IN ('netstat -ano ^| findstr :%APP_PORT%') DO taskkill /PID %%a /F 2>nul
                    docker run -d -p 3000:80 --name %CONTAINER_NAME% %IMAGE_NAME%
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment successful → http://localhost:3000"
        }
        failure {
            echo "Pipeline FAILED. Check logs."
        }
    }
}