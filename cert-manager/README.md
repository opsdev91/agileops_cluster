# cert-manager.io

## Installation

By default, cert-manager will be installed into the cert-manager namespace. It is possible to run cert-manager in a different namespace, although you'll need to make modifications to the deployment manifests.

```sh
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.8.2/cert-manager.yaml
```

## Verifying the Installation

First, make sure that [cmctl is installed.](https://cert-manager.io/docs/usage/cmctl/#installation)

```sh
$ cmctl check api
The cert-manager API is ready
```