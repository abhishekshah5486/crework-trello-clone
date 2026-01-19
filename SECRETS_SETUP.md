# GitHub Secrets Configuration Guide

This document explains how to configure the required secrets for the CI/CD pipeline.

## Required Secrets

### 1. DOCKERHUB_USERNAME

**Description**: Your DockerHub username

**How to get it:**
- Your DockerHub username (the one you use to log in)

**Steps to add:**
1. Go to your GitHub repository
2. Navigate to `Settings > Secrets and variables > Actions`
3. Click `New repository secret`
4. Name: `DOCKERHUB_USERNAME`
5. Value: Your DockerHub username (e.g., `myusername`)

---

### 2. DOCKERHUB_TOKEN

**Description**: DockerHub access token for authentication

**How to get it:**
1. Log in to DockerHub
2. Go to `Account Settings > Security`
3. Click `New Access Token`
4. Give it a name (e.g., "GitHub Actions")
5. Set permissions to `Read & Write`
6. Copy the generated token (you won't see it again!)

**Steps to add:**
1. Go to your GitHub repository
2. Navigate to `Settings > Secrets and variables > Actions`
3. Click `New repository secret`
4. Name: `DOCKERHUB_TOKEN`
5. Value: Paste the token you copied

**⚠️ Important**: Never share this token or commit it to the repository.

---

### 3. MONGODB_URI

**Description**: MongoDB connection string

**Format**: `mongodb://username:password@host:port/database` or `mongodb+srv://username:password@cluster.mongodb.net/database`

**Steps to add:**
1. Go to your GitHub repository
2. Navigate to `Settings > Secrets and variables > Actions`
3. Click `New repository secret`
4. Name: `MONGODB_URI`
5. Value: Your MongoDB connection string

**Example**: `mongodb+srv://user:pass@cluster.mongodb.net/trello-clone?retryWrites=true&w=majority`

---

### 4. JWT_SECRET

**Description**: Secret key for JWT token signing

**How to generate:**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64
```

**Steps to add:**
1. Go to your GitHub repository
2. Navigate to `Settings > Secrets and variables > Actions`
3. Click `New repository secret`
4. Name: `JWT_SECRET`
5. Value: Generated secret string

**⚠️ Important**: Use a strong, random secret. Never commit this to the repository.

---

### 5. KUBECONFIG

**Description**: Base64 encoded Kubernetes configuration file

**How to get it:**
```bash
# If you have kubectl configured locally
cat ~/.kube/config | base64

# Copy the entire output
```

**Steps to add:**
1. Go to your GitHub repository
2. Navigate to `Settings > Secrets and variables > Actions`
3. Click `New repository secret`
4. Name: `KUBECONFIG`
5. Value: Paste the base64 encoded config

**Note**: This is required for the CD pipeline to deploy to Kubernetes.

---

### 6. SNYK_TOKEN (Optional)

**Description**: Snyk API token for advanced dependency scanning

**How to get it:**
1. Sign up/login at [snyk.io](https://snyk.io)
2. Go to `Settings > API Token`
3. Copy your API token

**Steps to add:**
1. Go to your GitHub repository
2. Navigate to `Settings > Secrets and variables > Actions`
3. Click `New repository secret`
4. Name: `SNYK_TOKEN`
5. Value: Your Snyk API token

**Note**: This is optional. The pipeline will work without it, but Snyk scanning will be skipped.

---

## Verification

After adding all secrets, you can verify they're set correctly:

1. Go to `Settings > Secrets and variables > Actions`
2. You should see all the secrets listed (values are hidden)
3. The pipeline will use these secrets automatically when triggered

## Security Best Practices

1. ✅ **Never commit secrets** to the repository
2. ✅ **Use strong, random values** for secrets like JWT_SECRET
3. ✅ **Rotate secrets regularly**, especially if compromised
4. ✅ **Limit access** to repository secrets (use environment-specific secrets if possible)
5. ✅ **Use different secrets** for different environments (staging vs production)

## Troubleshooting

### Pipeline fails with "Secret not found"
- Verify the secret name matches exactly (case-sensitive)
- Ensure the secret is added to the correct repository
- Check that you're using the secret in the correct workflow file

### Docker push fails
- Verify `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` are correct
- Check that the token has `Read & Write` permissions
- Ensure the token hasn't expired

### Kubernetes deployment fails
- Verify `KUBECONFIG` is correctly base64 encoded
- Check that the kubeconfig file is valid
- Ensure the cluster is accessible from GitHub Actions runners

---

**Last Updated**: 2025-01-18
