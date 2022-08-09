# Recovering K10 From a Disaster

## Specifying a DR Passphrase

```sh
kubectl create secret generic k10-dr-secret \
   --namespace kasten-io \
   --from-literal key=<passphrase>
```

## Restore K10 Backup

```sh
# Install the helm chart that creates the K10 restore job and wait for completion of the `k10-restore` job
# Assumes that K10 is installed in 'kasten-io' namespace.
helm install k10-restore kasten/k10restore --namespace=kasten-io \
    --set sourceClusterID=<source-clusterID> \
    --set profile.name=<location-profile-name>
```

## Uninstall k10restore

The K10restore instance can be uninstalled with the helm uninstall command.

```sh
# e.g. to uninstall K10restore from the kasten-io namespace
helm uninstall k10-restore kasten/k10restore --namespace=kasten-io
```
