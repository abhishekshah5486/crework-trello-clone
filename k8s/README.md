# Kubernetes Manifests

This directory contains Kubernetes deployment manifests for the Trello Clone application.

## Files

- `backend-deployment.yaml`: Backend service deployment configuration
- `backend-service.yaml`: Backend service exposure configuration
- `frontend-deployment.yaml`: Frontend service deployment configuration
- `frontend-service.yaml`: Frontend service exposure configuration
- `dockerhub-secret.yaml`: Template for DockerHub authentication secret

## Prerequisites

1. Kubernetes cluster (v1.28.0 or compatible)
2. kubectl configured and connected to cluster
3. DockerHub images built and pushed (via CI pipeline)

## Deployment Steps

### 1. Create Namespace

```bash
kubectl create namespace crework-trello
```

### 2. Create DockerHub Secret

```bash
kubectl create secret docker-registry dockerhub-secret \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=<YOUR_DOCKERHUB_USERNAME> \
  --docker-password=<YOUR_DOCKERHUB_TOKEN> \
  --docker-email=<YOUR_EMAIL> \
  --namespace=crework-trello
```

### 3. Update Image Names

Before deploying, update the image names in the deployment files:

- In `backend-deployment.yaml`: Replace `<DOCKERHUB_USERNAME>` with your DockerHub username
- In `frontend-deployment.yaml`: Replace `<DOCKERHUB_USERNAME>` with your DockerHub username

### 4. Create ConfigMap and Secrets

```bash
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
```

### 5. Deploy Application

```bash
# Deploy backend
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml

# Deploy frontend
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

### 6. Verify Deployment

```bash
# Check pods
kubectl get pods -n crework-trello

# Check services
kubectl get services -n crework-trello

# Check deployment status
kubectl rollout status deployment/backend-deployment -n crework-trello
kubectl rollout status deployment/frontend-deployment -n crework-trello
```

## Accessing the Application

- **Frontend**: `http://<node-ip>:30000`
- **Backend**: `http://<node-ip>:30001`

To get the node IP:

```bash
kubectl get nodes -o wide
```

## Resource Requirements

The deployments are configured with the following resource limits:

**Backend:**
- Requests: 256Mi memory, 250m CPU
- Limits: 512Mi memory, 500m CPU

**Frontend:**
- Requests: 128Mi memory, 100m CPU
- Limits: 256Mi memory, 200m CPU

Adjust these values based on your cluster capacity and application needs.

## Health Checks

Both deployments include:

- **Liveness Probe**: Restarts container if unhealthy
- **Readiness Probe**: Determines when container is ready to receive traffic

Health check endpoints:
- Backend: `/health`
- Frontend: `/health`

## Scaling

To scale the deployments:

```bash
# Scale backend
kubectl scale deployment backend-deployment --replicas=3 -n crework-trello

# Scale frontend
kubectl scale deployment frontend-deployment --replicas=3 -n crework-trello
```

## Troubleshooting

### Pods not starting

```bash
# Check pod status
kubectl describe pod <pod-name> -n crework-trello

# Check logs
kubectl logs <pod-name> -n crework-trello
```

### Image pull errors

- Verify DockerHub secret is correctly configured
- Check image name and tag in deployment files
- Ensure images exist in DockerHub

### Service not accessible

- Verify service type and ports
- Check node port availability (30000, 30001)
- Verify firewall rules allow traffic
