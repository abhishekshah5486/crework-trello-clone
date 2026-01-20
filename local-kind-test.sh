#!/bin/bash
set -e

# -------------------------
# Variables (dummy for local testing)
# -------------------------
CLUSTER_NAME="dummy-cluster"
NAMESPACE="crework-trello"
MONGODB_URI="mongodb+srv://ciuser:FpUENj1EHiZXgamr@cluster0.xhbnstm.mongodb.net/?appName=Cluster0
"
JWT_SECRET="dummysecret"

# -------------------------
# Install kind (if not already)
# -------------------------

if ! command -v kind &> /dev/null; then
  echo "Installing kind..."
  curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-darwin-amd64
  chmod +x ./kind
  sudo mv ./kind /usr/local/bin/kind
fi

# -------------------------
# Create kind cluster
# -------------------------
kind create cluster --name $CLUSTER_NAME
kubectl cluster-info --context kind-$CLUSTER_NAME

# -------------------------
# Create Namespace
# -------------------------
kubectl create namespace $NAMESPACE || true
kubectl config set-context --current --namespace=$NAMESPACE

# -------------------------
# Create backend Secret (from env variables)
# -------------------------
kubectl create secret generic backend-secrets \
  --from-literal=mongodb-uri="$MONGODB_URI" \
  --from-literal=jwt-secret="$JWT_SECRET" \
  --namespace=$NAMESPACE || true

# -------------------------
# Deploy Backend
# -------------------------
kubectl apply -f $(pwd)/k8s/backend-deployment.yaml
kubectl apply -f $(pwd)/k8s/backend-service.yaml

echo "Waiting for backend rollout..."
kubectl rollout status deployment/backend-deployment --timeout=3m

# -------------------------
# Deploy Frontend
# -------------------------
kubectl apply -f $(pwd)/k8s/frontend-deployment.yaml
kubectl apply -f $(pwd)/k8s/frontend-service.yaml

echo "Waiting for frontend rollout..."
kubectl rollout status deployment/frontend-deployment --timeout=3m

# -------------------------
# Verify resources
# -------------------------
kubectl get pods -n $NAMESPACE
kubectl get services -n $NAMESPACE
kubectl get deployments -n $NAMESPACE

echo "✅ Local kind cluster test complete!"

