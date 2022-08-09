# ELK CLuster

## Install custom resource definitions:

```
kubectl create -f https://download.elastic.co/downloads/eck/2.1.0/crds.yaml
```

## Install the operator with its RBAC rules:

```
kubectl apply -f https://download.elastic.co/downloads/eck/2.1.0/operator.yaml
```

## Monitor the operator logs:

```
kubectl -n elastic-system logs -f statefulset.apps/elastic-operator
```