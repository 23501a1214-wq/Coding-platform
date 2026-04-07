pipeline {
    agent any

    environment {
        IMAGE_NAME     = "coding-platform"
        CONTAINER_NAME = "coding-platform-container"
        APP_PORT       = "5173"
    }

    stages {

        // ─────────────────────────────────────────────
        // STAGE 1 — Clone Repository
        // ─────────────────────────────────────────────
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/nikhilesh440/Coding-platform.git'
            }
        }

        // ─────────────────────────────────────────────
        // STAGE 2 — Install Dependencies
        // ─────────────────────────────────────────────
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        // ─────────────────────────────────────────────
        // STAGE 3 — Verify Project Structure
        // ─────────────────────────────────────────────
        stage('Test: Verify Project Structure') {
            steps {
                bat '''
                    IF NOT EXIST src (
                        echo ERROR: src folder missing!
                        exit /b 1
                    )
                    IF NOT EXIST index.html (
                        echo ERROR: index.html missing!
                        exit /b 1
                    )
                    IF NOT EXIST vite.config.js (
                        echo ERROR: vite.config.js missing!
                        exit /b 1
                    )
                    IF NOT EXIST src\\pages\\Login.jsx (
                        echo ERROR: Login.jsx missing!
                        exit /b 1
                    )
                    IF NOT EXIST src\\pages\\Leaderboard.jsx (
                        echo ERROR: Leaderboard.jsx missing!
                        exit /b 1
                    )
                    IF NOT EXIST src\\pages\\Signup.jsx (
                        echo ERROR: Signup.jsx missing!
                        exit /b 1
                    )
                    echo All required project files are present.
                '''
            }
        }

        // ─────────────────────────────────────────────
        // STAGE 4 — LOGIN TEST CASES
        //   TC01: Empty username + password → should alert
        //   TC02: Empty username only       → should alert
        //   TC03: Empty password only       → should alert
        //   TC04: Wrong password            → "Incorrect password"
        //   TC05: Non-existent username     → "No account found"
        //   TC06: Correct credentials       → login success
        // ─────────────────────────────────────────────
        stage('Test: Login Validation') {
            steps {
                bat 'npx jest src/pages/Login.test.js --no-coverage --verbose'
            }
            post {
                failure {
                    echo "LOGIN TESTS FAILED — check empty-field or wrong-password logic in Login.jsx"
                }
                success {
                    echo "LOGIN TESTS PASSED — all 6 login cases verified."
                }
            }
        }

        // ─────────────────────────────────────────────
        // STAGE 5 — LEADERBOARD TEST CASES
        //   TC07: Users sorted by stars descending
        //   TC08: Missing stars treated as 0
        //   TC09: Empty localStorage returns empty list
        //   TC10: Single user shown as rank 1
        //   TC11: Equal stars handled without crash
        // ─────────────────────────────────────────────
        stage('Test: Leaderboard Order') {
            steps {
                bat 'npx jest src/pages/Leaderboard.test.js --no-coverage --verbose'
            }
            post {
                failure {
                    echo "LEADERBOARD TESTS FAILED — check sort logic in Leaderboard.jsx"
                }
                success {
                    echo "LEADERBOARD TESTS PASSED — all 5 leaderboard cases verified."
                }
            }
        }

        // ─────────────────────────────────────────────
        // STAGE 6 — SIGNUP TEST CASES
        //   TC12: Empty fields → should alert
        //   TC13: Duplicate username → should be blocked
        //   TC14: Successful signup → saves user to localStorage
        //   TC15: Second signup → does not overwrite first user
        // ─────────────────────────────────────────────
        stage('Test: Signup Validation') {
            steps {
                bat 'npx jest src/pages/Signup.test.js --no-coverage --verbose'
            }
            post {
                failure {
                    echo "SIGNUP TESTS FAILED — check duplicate user or empty field logic in Signup.jsx"
                }
                success {
                    echo "SIGNUP TESTS PASSED — all 4 signup cases verified."
                }
            }
        }

        // ─────────────────────────────────────────────
        // STAGE 7 — FULL JEST SUITE + COVERAGE
        //   Runs all test files together
        //   Total: 15 test cases across Login, Leaderboard, Signup
        // ─────────────────────────────────────────────
        stage('Test: Full Suite + Coverage') {
            steps {
                bat 'npx jest --coverage --coverageReporters=lcov --coverageReporters=text --verbose --testPathIgnorePatterns="src/App.test.js"'
            }
            post {
                success {
                    echo "ALL 15 TESTS PASSED — Coverage report at coverage/lcov-report/index.html"
                }
                failure {
                    echo "FULL SUITE FAILED — check individual stage output above."
                }
            }
        }

        // ─────────────────────────────────────────────
        // STAGE 8 — Build Verification
        // ─────────────────────────────────────────────
        stage('Test: Build Verification') {
            steps {
                bat 'npm run build'
                bat '''
                    IF NOT EXIST dist (
                        echo ERROR: Build failed - dist folder not created!
                        exit /b 1
                    )
                    echo Build successful - dist folder exists.
                '''
            }
        }

        // ─────────────────────────────────────────────
        // STAGE 9 — Build Docker Image
        // ─────────────────────────────────────────────
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        // ─────────────────────────────────────────────
        // STAGE 10 — Run Container
        // ─────────────────────────────────────────────
        stage('Run Container') {
            steps {
                bat '''
                    docker stop %CONTAINER_NAME% 2>nul
                    docker rm %CONTAINER_NAME% 2>nul
                    FOR /F "tokens=5" %%a IN ('netstat -ano ^| findstr :%APP_PORT%') DO taskkill /PID %%a /F 2>nul
                    docker run -d -p 5173:80 --name %CONTAINER_NAME% %IMAGE_NAME%
                '''
            }
        }
    }

    post {
        success {
            echo """
            ============================================================
             ALL 15 TEST CASES PASSED
             Coding Platform live at: http://localhost:5173
             Login tests    : TC01 - TC06  (6 cases)
             Leaderboard    : TC07 - TC11  (5 cases)
             Signup tests   : TC12 - TC15  (4 cases)
            ============================================================
            """
        }
        failure {
            echo "Pipeline FAILED. Check the failing stage in console output above."
        }
    }
}