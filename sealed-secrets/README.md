# Sealed Secret

## Installation

```sh
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
helm install agileops-secret sealed-secrets/sealed-secrets
```

## Install client side tool

Following https://github.com/bitnami-labs/sealed-secrets#installation-from-source

## Fetching cert

```sh
kubeseal \
    --controller-name=agileops-secret-sealed-secrets \
    --controller-namespace=default \
    --fetch-cert > mycert.pem
```

Then run 'kubeseal --cert mycert.pem' instead to use the local cert e.g.

## Raw mode

```sh
echo -n foo | kubeseal --raw --from-file=/dev/stdin --scope cluster-wide --cert mycert.pem
AgAjLKpIYV+...
```

## FAQ

### Will you still be able to decrypt if you no longer have access to your cluster?
No, the private keys are only stored in the Secret managed by the controller (unless you have some other backup of your k8s objects). There are no backdoors - without that private key used to encrypt a given SealedSecrets, you can't decrypt it. If you can't get to the Secrets with the encryption keys, and you also can't get to the decrypted versions of your Secrets live in the cluster, then you will need to regenerate new passwords for everything, seal them again with a new sealing key, etc.

### How can I do a backup of my SealedSecrets?
If you do want to make a backup of the encryption private keys, it's easy to do from an account with suitable access and:

```sh
kubectl get secret -n kube-system sealed-secrets-key -o yaml >>master.key
```

NOTE: you need the second statement only if you ever installed sealed-secrets older than version 0.9.x on your cluster.

NOTE: This file will contain the controller's public + private keys and should be kept omg-safe!

To restore from a backup after some disaster, just put that secrets back before starting the controller - or if the controller was already started, replace the newly-created secrets and restart the controller:

```sh
kubectl apply -f master.key
kubectl delete pod -n kube-system -l name=sealed-secrets-controller
```