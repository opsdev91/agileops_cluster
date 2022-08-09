# dbench
Benchmark Kubernetes persistent disk volumes with `fio`: Read/write IOPS, bandwidth MB/s and latency.

# Usage

1. Download [dbench.yaml](https://raw.githubusercontent.com/logdna/dbench/master/dbench.yaml) and edit the `storageClassName` to match your Kubernetes provider's Storage Class `kubectl get storageclasses`
2. Deploy Dbench using: `kubectl apply -f dbench.yaml`
3. Once deployed, the Dbench Job will:
    * provision a Persistent Volume of `1000Gi` (default) using `storageClassName: ssd` (default)
    * run a series of `fio` tests on the newly provisioned disk
    * currently there are 9 tests, 15s per test - total runtime is ~2.5 minutes
4. Follow benchmarking progress using: `kubectl logs -f job/dbench` (empty output means the Job not yet created, or `storageClassName` is invalid, see Troubleshooting below)
5. At the end of all tests, you'll see a summary that looks similar to this:
```
==================
= Dbench Summary =
==================
Random Read/Write IOPS: 75.7k/59.7k. BW: 523MiB/s / 500MiB/s
Average Latency (usec) Read/Write: 183.07/76.91
Sequential Read/Write: 536MiB/s / 512MiB/s
Mixed Random Read/Write IOPS: 43.1k/14.4k
```
6. Once the tests are finished, clean up using: `kubectl delete -f dbench.yaml` and that should deprovision the persistent disk and delete it to minimize storage billing.