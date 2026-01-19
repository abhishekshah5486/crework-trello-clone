# Crework Trello Clone - CI/CD Pipeline

A full-stack Trello clone application with production-grade CI/CD pipeline implementation using GitHub Actions, Docker, and Kubernetes.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Application Architecture](#application-architecture)
- [CI/CD Pipeline](#cicd-pipeline)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [CI/CD Configuration](#cicd-configuration)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Security Features](#security-features)
- [Project Structure](#project-structure)

## 🎯 Project Overview

This project implements a complete DevOps CI/CD pipeline for a Trello clone application, demonstrating:

- **Continuous Integration (CI)**: Automated builds, testing, and quality checks
- **Continuous Deployment (CD)**: Automated deployment to Kubernetes
- **DevSecOps**: Security scanning at multiple stages
- **Containerization**: Docker-based containerization
- **Orchestration**: Kubernetes deployment with health checks

## 🏗️ Application Architecture

### Technology Stack

**Frontend:**
- React 18
- Material-UI
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

**Infrastructure:**
- Docker
- Kubernetes
- Nginx (for frontend serving)

## 🔄 CI/CD Pipeline

### CI Pipeline Stages

The CI pipeline (`.github/workflows/ci.yml`) includes the following stages:

#### 1. **Checkout & Setup**
- Retrieves source code from repository
- Sets up Node.js runtime environment
- Configures dependency caching

**Why it matters:** Ensures consistent build environment and faster builds through caching.

#### 2. **Linting**
- Runs ESLint on frontend and backend code
- Enforces coding standards
- Identifies code quality issues early

**Why it matters:** Prevents technical debt and maintains code consistency across the team.

#### 3. **SAST (Static Application Security Testing)**
- CodeQL analysis for JavaScript/React vulnerabilities
- Semgrep security scanning
- Detects OWASP Top 10 issues

**Why it matters:** Identifies security vulnerabilities before code reaches production, implementing shift-left security.

#### 4. **SCA (Software Composition Analysis)**
- npm audit for dependency vulnerabilities
- Snyk security scanning
- Identifies supply-chain risks

**Why it matters:** Prevents vulnerable dependencies from being deployed, addressing supply-chain security.

#### 5. **Unit Tests**
- Executes frontend and backend test suites
- Generates coverage reports
- Validates business logic

**Why it matters:** Prevents regressions and ensures code quality before deployment.

#### 6. **Build**
- Builds React frontend production bundle
- Validates backend syntax
- Creates build artifacts

**Why it matters:** Ensures application can be built successfully before containerization.

#### 7. **Docker Build**
- Builds multi-stage Docker images for frontend and backend
- Pushes images to DockerHub
- Implements layer caching for faster builds

**Why it matters:** Creates portable, reproducible container images for deployment.

#### 8. **Image Scanning**
- Trivy vulnerability scanning on container images
- Scans OS and library vulnerabilities
- Uploads results to GitHub Security tab

**Why it matters:** Prevents vulnerable container images from being deployed to production.

#### 9. **Container Runtime Test**
- Validates containers can start successfully
- Tests health endpoints
- Ensures basic functionality

**Why it matters:** Ensures images are runnable and functional before deployment.

#### 10. **Registry Push**
- Pushes trusted images to DockerHub
- Tags images with version information

**Why it matters:** Makes images available for deployment and enables downstream CD processes.

### CD Pipeline Stages

The CD pipeline (`.github/workflows/cd.yml`) includes:

#### 1. **Verify CI Success**
- Ensures CI pipeline completed successfully
- Prevents deployment of failed builds

#### 2. **Kubernetes Deployment**
- Deploys frontend and backend to Kubernetes cluster
- Creates ConfigMaps and Secrets
- Implements rolling updates

#### 3. **DAST (Dynamic Application Security Testing)**
- OWASP ZAP baseline scan
- Security headers validation
- Health check verification

#### 4. **Post-Deployment Verification**
- Verifies pod status
- Checks application logs
- Validates deployment success

## 🚀 Prerequisites

### Local Development
- Node.js 18.x
- npm or yarn
- MongoDB (local or cloud instance)

### CI/CD Requirements
- GitHub repository
- DockerHub account
- Kubernetes cluster (local or cloud)
- kubectl configured

## 💻 Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd crework-trello-clone
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/trello-clone
JWT_SECRET=your-secret-key-here
PORT=8081
```

Start the backend:

```bash
npm start
# or for development
npm run dev
```

### 3. Frontend Setup

```bash
# From project root
npm install
npm start
```

The application will be available at `http://localhost:3000`

### 4. Running Tests

**Frontend:**
```bash
npm test
```

**Backend:**
```bash
cd server
npm test
```

## ⚙️ CI/CD Configuration

### Required GitHub Secrets

Configure the following secrets in your GitHub repository settings (`Settings > Secrets and variables > Actions`):

| Secret Name | Description | How to Get |
|------------|-------------|------------|
| `DOCKERHUB_USERNAME` | Your DockerHub username | DockerHub account |
| `DOCKERHUB_TOKEN` | DockerHub access token | DockerHub > Account Settings > Security > New Access Token |
| `MONGODB_URI` | MongoDB connection string | Your MongoDB instance |
| `JWT_SECRET` | JWT signing secret | Generate a secure random string |
| `KUBECONFIG` | Kubernetes config file (base64 encoded) | `cat ~/.kube/config \| base64` |
| `SNYK_TOKEN` | Snyk API token (optional) | Snyk account |

### Setting Up Secrets

1. Go to your GitHub repository
2. Navigate to `Settings > Secrets and variables > Actions`
3. Click `New repository secret`
4. Add each secret with its corresponding value

**Important:** Never commit secrets to the repository. Always use GitHub Secrets.

### Workflow Triggers

The CI pipeline triggers on:
- Push to `master` or `main` branch
- Pull requests to `master` or `main`
- Manual trigger via `workflow_dispatch`

The CD pipeline triggers on:
- Successful completion of CI pipeline
- Manual trigger via `workflow_dispatch`

## ☸️ Kubernetes Deployment

### Prerequisites

1. Kubernetes cluster (local or cloud)
2. kubectl configured and connected to cluster
3. DockerHub images accessible from cluster

### Create DockerHub Secret in Kubernetes

```bash
kubectl create secret docker-registry dockerhub-secret \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=<DOCKERHUB_USERNAME> \
  --docker-password=<DOCKERHUB_TOKEN> \
  --docker-email=<EMAIL> \
  --namespace=crework-trello
```

### Deploy Application

```bash
# Create namespace
kubectl create namespace crework-trello

# Create ConfigMap
kubectl create configmap backend-config \
  --from-literal=MONGODB_URI="<your-mongodb-uri>" \
  --from-literal=JWT_SECRET="<your-jwt-secret>" \
  --from-literal=PORT="8081" \
  --namespace=crework-trello

# Create Secrets
kubectl create secret generic backend-secrets \
  --from-literal=mongodb-uri="<your-mongodb-uri>" \
  --from-literal=jwt-secret="<your-jwt-secret>" \
  --namespace=crework-trello

# Deploy backend
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml

# Deploy frontend
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# Check status
kubectl get pods -n crework-trello
kubectl get services -n crework-trello
```

### Access Application

- Frontend: `http://<node-ip>:30000`
- Backend: `http://<node-ip>:30001`

## 🔒 Security Features

### Security Scanning

1. **CodeQL**: Static analysis for security vulnerabilities
2. **Semgrep**: Pattern-based security scanning
3. **npm audit**: Dependency vulnerability scanning
4. **Snyk**: Advanced dependency scanning
5. **Trivy**: Container image vulnerability scanning
6. **OWASP ZAP**: Dynamic application security testing

### Security Best Practices

- Non-root user in containers
- Health checks for containers
- Resource limits in Kubernetes
- Secrets management via Kubernetes Secrets
- Security headers in Nginx configuration
- Regular dependency updates

## 📁 Project Structure

```
crework-trello-clone/
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI Pipeline
│       └── cd.yml           # CD Pipeline
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   └── dockerhub-secret.yaml
├── server/
│   ├── __tests__/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── Dockerfile.backend
│   └── package.json
├── src/
│   ├── __tests__/
│   ├── Components/
│   ├── Pages/
│   └── ...
├── Dockerfile.frontend
├── nginx.conf
├── .eslintrc.json
├── .dockerignore
└── README.md
```

## 🧪 Testing

### Running Tests Locally

**Frontend Tests:**
```bash
npm test
```

**Backend Tests:**
```bash
cd server
npm test
```

### Test Coverage

The CI pipeline generates coverage reports and uploads them to Codecov.

## 📊 Pipeline Insights

### Why Each Stage Exists

1. **Linting**: Prevents technical debt accumulation
2. **SAST**: Detects security vulnerabilities early (shift-left)
3. **SCA**: Identifies vulnerable dependencies
4. **Unit Tests**: Prevents regressions
5. **Build**: Validates application can be packaged
6. **Docker Build**: Creates portable deployment artifacts
7. **Image Scan**: Prevents vulnerable images from shipping
8. **Container Test**: Ensures images are functional
9. **Kubernetes Deploy**: Enables scalable, resilient deployment
10. **DAST**: Validates runtime security

## 🐛 Troubleshooting

### CI Pipeline Issues

1. **Build Failures**: Check Node.js version compatibility
2. **Test Failures**: Review test output in GitHub Actions logs
3. **Docker Build Failures**: Verify Dockerfile syntax and base images
4. **Security Scan Failures**: Review and fix identified vulnerabilities

### CD Pipeline Issues

1. **Deployment Failures**: Check Kubernetes cluster connectivity
2. **Image Pull Errors**: Verify DockerHub credentials and image availability
3. **Pod Startup Issues**: Check logs with `kubectl logs -n crework-trello <pod-name>`

## 📝 Notes

- The pipeline uses `continue-on-error: true` for some security scans to prevent blocking deployments for informational findings
- Adjust resource limits in Kubernetes manifests based on your cluster capacity
- Update Docker image tags in Kubernetes manifests to match your DockerHub repository

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure CI pipeline passes
4. Submit a pull request

## 📄 License

This project is part of a DevOps assessment and portfolio demonstration.

---

**Built with ❤️ for DevOps Excellence**
