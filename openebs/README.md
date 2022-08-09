# Open EBS

## OpenEBS Install Prerequisites

https://openebs.io/docs/user-guides/prerequisites

## Get Started

```sh
helm repo add openebs https://openebs.github.io/charts
helm repo update
```

### Install with cStor

```sh
helm install openebs --namespace openebs openebs/openebs --create-namespace --set cstor.enabled=true --set ndm.filters.includePaths=/dev/vda
```