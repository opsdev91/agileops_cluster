# Migrate cluster

1. Back up the cluster resources (StorageClasses, CustomResourceDefinitions, ClusterRoles, and ClusterRoleBindings)

2. Back up Operators if any (Elasticsearch ...)

3. Back up the Applications

4. Restore cluster resources into target cluster

5. Resotre Operators

6. Restore Applications