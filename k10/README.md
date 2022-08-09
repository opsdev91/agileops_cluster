# Kasten K10

## Requiements

https://docs.kasten.io/5.0.2/install/requirements.html
## Install

https://docs.kasten.io/install/index.html

```sh
helm repo add kasten https://charts.kasten.io/
kubectl create namespace kasten-io 
helm install k10 kasten/k10 --namespace=kasten-io --set global.persistence.storageClass=longhorn \
--set injectKanisterSidecar.enabled=true \
--set-string injectKanisterSidecar.namespaceSelector.matchLabels.k10/injectKanisterSidecar=true \
--set auth.basicAuth.enabled=true \
--set auth.basicAuth.htpasswd='admin:$apr1$bqurs61l$uJ4Gb7EyxTPlIskPm8Q/30'
```

## Generic Storage Backup and Restore
### Enable Kanister Sidecar Injection
```sh
helm upgrade k10 kasten/k10 --namespace=kasten-io --reuse-values \
--set injectKanisterSidecar.enabled=true \
--set-string injectKanisterSidecar.namespaceSelector.matchLabels.k10/injectKanisterSidecar=true
```

## How to access the K10 Dashboard

The K10 dashboard is not exposed externally. To establish a connection to it use the following `kubectl` command:
```sh
kubectl --namespace kasten-io port-forward service/gateway 8080:8000
```

The Kasten dashboard will be available at: `http://127.0.0.1:8080/k10/#/`

## Enable Basic Auth

Basic Authentication allows you to protect access to the K10 dashboard with a user name and password. To enable Basic Authentication, you will first need to generate [htpasswd](http://www.htaccesstools.com/htpasswd-generator/) credentials by either using an online [tool](http://www.htaccesstools.com/htpasswd-generator/) or via the htpasswd binary found on most systems. Once generated, you need to supply the resulting string with the helm install or upgrade command using the following flags.

```sh
helm upgrade k10 kasten/k10 --namespace=kasten-io --reuse-values \
--set auth.basicAuth.enabled=true \
--set auth.basicAuth.htpasswd='admin:$apr1$bqurs61l$uJ4Gb7EyxTPlIskPm8Q/30'
```