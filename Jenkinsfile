pipeline {
    agent any
    tools {
        go '1.17.6'
    }
    stages {
        stage('Golang APIs'){
            steps {
                bat 'go run main.go'            
            }
        }
    }
}
