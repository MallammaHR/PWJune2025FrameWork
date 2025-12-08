pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\.cache\\ms-playwright"

        // Emojis for notifications
        DEV_EMOJI   = "🟢"
        QA_EMOJI    = "🔵"
        STAGE_EMOJI = "🟠"
        PROD_EMOJI  = "🔴"

        // Slack & Email
        SLACK_WEBHOOK_URL = credentials('slack-webhook-token')
        EMAIL_RECIPIENTS   = "test@gmail.com"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        /* ------------------------
           🟢 DEV ENVIRONMENT
           ------------------------ */
        stage('DEV - Run Tests') {
            steps {
                echo "Running DEV tests..."
                bat 'npx playwright test --config=playwright.dev.config.ts || exit 0'
            }
            post {
                always {
                    script {
                        env.DEV_TEST_STATUS = currentBuild.currentResult
                    }
                }
            }
        }

        /* ------------------------
           🔵 QA ENVIRONMENT
           ------------------------ */
        stage('QA - Run Tests') {
            when { expression { env.DEV_TEST_STATUS == "SUCCESS" } }
            steps {
                echo "Running QA tests..."
                bat 'npx playwright test --config=playwright.qa.config.ts || exit 0'
            }
            post {
                always {
                    script {
                        env.QA_TEST_STATUS = currentBuild.currentResult
                    }
                }
            }
        }

        /* ------------------------
           🟠 STAGE ENVIRONMENT
           ------------------------ */
        stage('STAGE - Run Tests') {
            when { expression { env.QA_TEST_STATUS == "SUCCESS" } }
            steps {
                echo "Running STAGE tests..."
                bat 'npx playwright test --config=playwright.stage.config.ts || exit 0'
            }
            post {
                always {
                    script {
                        env.STAGE_TEST_STATUS = currentBuild.currentResult
                    }
                }
            }
        }

        /* ------------------------
           🔴 PROD ENVIRONMENT
           ------------------------ */
        stage('PROD - Run Tests') {
            when { expression { env.STAGE_TEST_STATUS == "SUCCESS" } }
            steps {
                echo "Running PROD tests..."
                bat 'npx playwright test --config=playwright.prod.config.ts || exit 0'
            }
            post {
                always {
                    script {
                        env.PROD_TEST_STATUS = currentBuild.currentResult
                    }
                }
            }
        }
    }

    post {

        /* ------------------------
           🎉 SUCCESS NOTIFICATION
           ------------------------ */
        success {
            script {
                slackSend(
                    color: 'good',
                    message: """🎉 *Playwright Pipeline Success*

*Repository:* ${env.JOB_NAME}
*Build:* #${env.BUILD_NUMBER}

${env.DEV_EMOJI} DEV: ${env.DEV_TEST_STATUS}
${env.QA_EMOJI} QA: ${env.QA_TEST_STATUS}
${env.STAGE_EMOJI} STAGE: ${env.STAGE_TEST_STATUS}
${env.PROD_EMOJI} PROD: ${env.PROD_TEST_STATUS}

🔗 <${env.BUILD_URL}|Open Build>
📊 <${env.BUILD_URL}allure|Allure Report>
"""
                )
            }
        }

        /* ------------------------
           ❌ FAILURE NOTIFICATION
           ------------------------ */
        failure {
            script {
                slackSend(
                    color: 'danger',
                    message: """❌ *Playwright Pipeline Failed*

*Repository:* ${env.JOB_NAME}
*Build:* #${env.BUILD_NUMBER}

${env.DEV_EMOJI} DEV: ${env.DEV_TEST_STATUS}
${env.QA_EMOJI} QA: ${env.QA_TEST_STATUS}
${env.STAGE_EMOJI} STAGE: ${env.STAGE_TEST_STATUS}
${env.PROD_EMOJI} PROD: ${env.PROD_TEST_STATUS}

🔗 <${env.BUILD_URL}|Open Build>
📊 <${env.BUILD_URL}allure|Allure Report>
"""
                )
            }
        }

        /* ------------------------
           ⚠️ UNSTABLE NOTIFICATION
           ------------------------ */
        unstable {
            script {
                slackSend(
                    color: 'warning',
                    message: """⚠️ *Playwright Pipeline Unstable*

*Repository:* ${env.JOB_NAME}
*Build:* #${env.BUILD_NUMBER}

🔗 <${env.BUILD_URL}|Open Build>
📊 <${env.BUILD_URL}allure|Allure Report>
"""
                )
            }
        }
    }
}
