const { exec } = require("child_process");

exec("kubectl get volumesnapshots -o=name -A", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    const lines = stdout.split(/\r?\n/);
    // For each lines
    lines.filter(line => line !== '').forEach(line => {
        //console.log(`kubectl patch ${line}  -p '{"metadata": {"finalizers": []}}' --type merge -n jenkins`);
        exec(`kubectl patch ${line}  -p '{"metadata": {"finalizers": []}}' --type merge -n demo`);
        exec(`kubectl patch ${line}  -p '{"metadata": {"finalizers": []}}' --type merge -n kasten-io`);
    });
});