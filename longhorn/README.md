# Installation Requirements

Each node in the Kubernetes cluster where Longhorn is installed must fulfill the following requirements:

- A container runtime compatible with Kubernetes (Docker v1.13+, containerd v1.3.7+, etc.)
- Kubernetes v1.18+.
- `open-iscsi` is installed, and the iscsid daemon is running on all the nodes. This is necessary, since Longhorn relies on iscsiadm on the host to provide persistent volumes to Kubernetes. For help installing open-iscsi, refer to [this section](https://openebs.io/docs/user-guides/prerequisites#ubuntu).
- RWX support requires that each node has a NFSv4 client installed.
    For installing a NFSv4 client, refer to [this section](https://longhorn.io/docs/1.3.0/deploy/install/#installing-nfsv4-client).
- The host filesystem supports the file extents feature to store the data. Currently we support:
    - ext4
    - XFS
- `bash`, `curl`, `findmnt`, `grep`, `awk`, `blkid`, `lsblk` must be installed.
- [Mount propagation](https://kubernetes-csi.github.io/docs/deploying.html#enabling-mount-propagation) must be enabled.

The Longhorn workloads must be able to run as root in order for Longhorn to be deployed and operated properly.

[This script](https://longhorn.io/docs/1.3.0/deploy/install/#using-the-environment-check-script) can be used to check the Longhorn environment for potential issues.

For the minimum recommended hardware, refer to the [best practices guide](https://longhorn.io/docs/1.3.0/best-practices/#minimum-recommended-hardware).

# OS/Distro Specific Configuration

K3s clusters require some extra setup. Refer to [this section](https://longhorn.io/docs/1.3.0/advanced-resources/os-distro-specific/csi-on-k3s).

# Using the Environment Check Script

Note `jq` maybe required to be installed locally prior to running env check script.

```sh
curl -sSfL https://raw.githubusercontent.com/longhorn/longhorn/v1.3.0/scripts/environment_check.sh | bash
```

# Installing Longhorn

Add the Longhorn Helm repository:

```sh
helm repo add longhorn https://charts.longhorn.io
helm repo update
```

Install Longhorn in the `longhorn-system` namespace.

```sh
helm install longhorn longhorn/longhorn --namespace longhorn-system --create-namespace
```

# Basic Auth

Create a basic auth file `auth`. It’s important the file generated is named `auth` (actually - that the secret has a key `data.auth`), otherwise the Ingress returns a 503.

```sh
USER=<USERNAME_HERE>; PASSWORD=<PASSWORD_HERE>; echo "${USER}:$(openssl passwd -stdin -apr1 <<< ${PASSWORD})" >> auth
```

```sh
kubectl -n longhorn-system create secret generic basic-auth --from-file=auth
```

# Mount disk to node

```sh
sudo mkfs.ext4 /dev/vda
sudo mkdir /data
sudo mount /dev/vda /data
```

Permanently add the `/data` directory to the `/etc/fstab` file.

```sh
sudo vi /etc/fstab
```
Add `/dev/vda    /data   ext4    defaults     0        2`

Check the drive is mounted or not

```sh
sudo mount | grep vda
```

## Setup CSI Volume Snapshotting

### Install the VolumeSnapshot CRDs

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v4.1.1/client/config/crd/snapshot.storage.k8s.io_volumesnapshotclasses.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v4.1.1/client/config/crd/snapshot.storage.k8s.io_volumesnapshotcontents.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v4.1.1/client/config/crd/snapshot.storage.k8s.io_volumesnapshots.yaml
```

### Install the Snapshot Controller

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v4.1.1/deploy/kubernetes/snapshot-controller/rbac-snapshot-controller.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v4.1.1/deploy/kubernetes/snapshot-controller/setup-snapshot-controller.yaml
```