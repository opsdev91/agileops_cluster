# Reference

https://github.com/jenkinsci/helm-charts/blob/main/charts/jenkins/README.md

# Get Started

```sh
helm repo add jenkins https://charts.jenkins.io
helm repo update
```

```sh
kubectl create namespace jenkins
helm install jenkins jenkins/jenkins --namespace=jenkins --set persistence.storageClass=longhorn --set persistence.size='8Gi'
```

## Update Jenkins url

```sh
helm upgrade jenkins jenkins/jenkins --namespace=jenkins --reuse-values \
--set controller.jenkinsUrl='jenkins.aandd.io'
```

## Update service type

```sh
helm upgrade jenkins jenkins/jenkins --namespace=jenkins --reuse-values \
--set controller.serviceType='NodePort' \
--set controller.agentListenerServiceType='NodePort' \
--set persistence.storageClass=longhorn
```

## Configure kubeneters as slave

https://plugins.jenkins.io/kubernetes/