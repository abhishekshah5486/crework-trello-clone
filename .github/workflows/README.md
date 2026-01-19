# CI/CD Pipeline Documentation

## Overview

This directory contains GitHub Actions workflows for Continuous Integration (CI) and Continuous Deployment (CD).

## Workflows

### CI Pipeline (`ci.yml`)

The CI pipeline runs on every push to master/main and on pull requests. It includes:

1. **Checkout & Setup**: Retrieves code and sets up Node.js environment
2. **Linting**: Code quality checks with ESLint
3. **SAST**: Static Application Security Testing with CodeQL and Semgrep
4. **SCA**: Software Composition Analysis with npm audit and Snyk
5. **Unit Tests**: Executes test suites for frontend and backend
6. **Build**: Builds the application
7. **Docker Build**: Creates and pushes Docker images to DockerHub
8. **Image Scan**: Scans container images with Trivy
9. **Container Test**: Validates containers can run successfully

### CD Pipeline (`cd.yml`)

The CD pipeline runs after successful CI completion and includes:

1. **Verify CI Success**: Ensures CI pipeline passed
2. **Kubernetes Deployment**: Deploys application to Kubernetes cluster
3. **DAST**: Dynamic Application Security Testing with OWASP ZAP
4. **Post-Deployment Verification**: Validates deployment success

## Required Secrets

Configure these secrets in GitHub repository settings:

- `DOCKERHUB_USERNAME`: DockerHub username
- `DOCKERHUB_TOKEN`: DockerHub access token
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `KUBECONFIG`: Base64 encoded Kubernetes config file
- `SNYK_TOKEN`: (Optional) Snyk API token

## Manual Trigger

Both workflows can be manually triggered via GitHub Actions UI using `workflow_dispatch`.
