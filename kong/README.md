## Kong Ingress


[Using helm](https://docs.konghq.com/kubernetes-ingress-controller/2.2.x/deployment/minikube/)

## Using cert-manager with Kong

[Using cert-manager for automated TLS certificate](https://docs.konghq.com/kubernetes-ingress-controller/2.4.x/guides/cert-manager/)

## Repository

https://github.com/Kong/charts/tree/main/charts/kong

## Install with DB

```sh
helm install agileops-ing kong/kong -n kong --create-namespace -f minimal-kong-standalone.yaml  
```