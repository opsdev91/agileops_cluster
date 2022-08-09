# Getting Started

## Helm
```sh
$ helm repo add aerokube https://charts.aerokube.com/
$ helm repo update
```

## Install

```sh
kubectl create namespace moon
helm upgrade --install -n moon moon aerokube/moon2 --set ingress.enabled=false \
--set customIngress.enabled=true \
--set customIngress.ingressClassName=kong \
--set customIngress.host=moon.aandd.io
```