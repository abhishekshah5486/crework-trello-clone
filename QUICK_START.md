# Quick Start Guide

This guide will help you get the CI/CD pipeline up and running quickly.

## Prerequisites Checklist

- [ ] GitHub repository created
- [ ] DockerHub account created
- [ ] Kubernetes cluster available (or local setup like minikube)
- [ ] MongoDB instance (local or cloud)

## Step 1: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets (see `SECRETS_SETUP.md` for detailed instructions):

1. `DOCKERHUB_USERNAME` - Your DockerHub username
2. `DOCKERHUB_TOKEN` - DockerHub access token
3. `MONGODB_URI` - MongoDB connection string
4. `JWT_SECRET` - Random secret string
5. `KUBECONFIG` - Base64 encoded kubeconfig (for CD pipeline)
6. `SNYK_TOKEN` - (Optional) Snyk API token

## Step 2: Update Kubernetes Manifests

Before the first deployment, update image names in Kubernetes manifests:

1. Open `k8s/backend-deployment.yaml`
2. Replace `<DOCKERHUB_USERNAME>` with your DockerHub username
3. Open `k8s/frontend-deployment.yaml`
4. Replace `<DOCKERHUB_USERNAME>` with your DockerHub username

**Note:** The CD pipeline will automatically replace these during deployment, but it's good to have them correct for manual deployments.

## Step 3: Trigger CI Pipeline

The CI pipeline will automatically run on:
- Push to `master` or `main` branch
- Pull requests to `master` or `main`
- Manual trigger via GitHub Actions UI

**To manually trigger:**
1. Go to Actions tab in GitHub
2. Select "CI Pipeline"
3. Click "Run workflow"
4. Select branch and click "Run workflow"

## Step 4: Verify CI Pipeline

Check the Actions tab to ensure:
- ✅ All stages pass
- ✅ Docker images are pushed to DockerHub
- ✅ Security scans complete (may have warnings, that's OK)

## Step 5: Configure Kubernetes (for CD Pipeline)

### Option A: Local Kubernetes (Minikube)

```bash
# Install minikube (if not already installed)
# macOS: brew install minikube
# Linux: Follow minikube installation guide

# Start minikube
minikube start

# Get kubeconfig
cat ~/.kube/config | base64
# Copy the output and add as KUBECONFIG secret in GitHub
```

### Option B: Cloud Kubernetes (GKE, EKS, AKS)

```bash
# Configure kubectl for your cluster
gcloud container clusters get-credentials <cluster-name>  # GKE
# or
aws eks update-kubeconfig --name <cluster-name>  # EKS
# or
az aks get-credentials --resource-group <rg> --name <cluster-name>  # AKS

# Get kubeconfig
cat ~/.kube/config | base64
# Copy the output and add as KUBECONFIG secret in GitHub
```

## Step 6: Create DockerHub Secret in Kubernetes

```bash
kubectl create secret docker-registry dockerhub-secret \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=<YOUR_DOCKERHUB_USERNAME> \
  --docker-password=<YOUR_DOCKERHUB_TOKEN> \
  --docker-email=<YOUR_EMAIL> \
  --namespace=crework-trello
```

## Step 7: Trigger CD Pipeline

After CI pipeline succeeds:

1. Go to Actions tab
2. Select "CD Pipeline"
3. Click "Run workflow"
4. Select environment (staging/production)
5. Click "Run workflow"

## Step 8: Verify Deployment

```bash
# Check pods
kubectl get pods -n crework-trello

# Check services
kubectl get services -n crework-trello

# Get service URLs
kubectl get service frontend-service -n crework-trello
kubectl get service backend-service -n crework-trello
```

## Troubleshooting

### CI Pipeline Fails

**Build failures:**
- Check Node.js version compatibility
- Verify all dependencies are in package.json

**Docker build failures:**
- Verify DockerHub credentials
- Check Dockerfile syntax

**Test failures:**
- Review test output in Actions logs
- Ensure test files are in correct locations

### CD Pipeline Fails

**Kubernetes connection:**
- Verify KUBECONFIG secret is correct
- Check cluster accessibility

**Image pull errors:**
- Verify DockerHub secret in Kubernetes
- Check image names in deployment files

**Deployment failures:**
- Check pod logs: `kubectl logs <pod-name> -n crework-trello`
- Verify ConfigMap and Secrets are created
- Check resource limits

## Local Testing

### Test Frontend Locally

```bash
npm install
npm start
# Open http://localhost:3000
```

### Test Backend Locally

```bash
cd server
npm install
# Create .env file with MONGODB_URI, JWT_SECRET, PORT
npm start
# Backend runs on http://localhost:8081
```

### Test Docker Images Locally

```bash
# Build frontend
docker build -f Dockerfile.frontend -t trello-frontend .

# Build backend
cd server
docker build -f Dockerfile.backend -t trello-backend .

# Run frontend
docker run -p 3000:80 trello-frontend

# Run backend
docker run -p 8081:8081 -e MONGODB_URI=<uri> -e JWT_SECRET=<secret> trello-backend
```

## Next Steps

1. Review `CI_CD_EXPLANATION.md` for detailed pipeline documentation
2. Review `README.md` for comprehensive project documentation
3. Customize pipeline stages based on your needs
4. Set up monitoring and alerting
5. Configure production environment secrets

## Support

For issues or questions:
1. Check GitHub Actions logs
2. Review Kubernetes pod logs
3. Verify all secrets are configured correctly
4. Check documentation files

---

**Happy Deploying! 🚀**
