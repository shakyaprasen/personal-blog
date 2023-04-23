---
title: Run MySQL database on kubernetes
description: A simple how to on running an instance of MySQL database on a Kubernetes cluster
tags:
  - how to
  - Dev Ops
  - Mysql 
  - Kuberentes
author: Prasen Shakya 
authorTwitter: ShakyaPrasen
date: "2023-04-22T11:37:54.082Z"
image: https://imgur.com/hixba4I.png
category: infrastructure
---

## Background  

A couple of months back, I had to migrate a MySQL server on AWS Relational 
Database Service(RDS) to our Kubernetes cluster on AWS Elastic Kubernetes 
Service(EKS).
This post serves as a how to guide as well as a reminder to myself in case I 
have do something like this again.

## Mysql Deployment

First things first, for running our own MySQL instance we need to create a 
deployment. A deployment in Kubernetes is just a configuration to express the
desired state for a Pod or ReplicaSet.

So, our deployment config *mysql/deployment.yaml* should look something like
this:


```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-database
spec:
  selector:
    matchLabels:
      app: mysql-database
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: mysql-database
    spec:
      containers:
        - image: mysql:8.0
          name: mysql-database
          env:
            - name: MYSQL_ROOT_PASSWORD
              value: ${MYSQL_ROOT_PASSWORD}
            - name: MYSQL_USER
              value: ${MYSQL_USERNAME}
            - name: MYSQL_PASSWORD
              value: ${MYSQL_PASSWORD}
            - name: MYSQL_DATABASE
              value: my_database
          ports:
            - containerPort: 3306
              name: mysql-database
```

The above config creates a deployment with mysql version 8.0 image from 
the official Dockerhub. The variables *${MYSQL_ROOT_PASSWORD}, 
${MYSQL_PASSWORD}, ${MYSQL_USERNAME}* should be populated preferrably using 
kubernetes secrets.

After changing the mentioned variables, you can run *kubectl apply -f 
./mysql/deployment.yaml* to run the mysql deployment.


## Mysql Service

So, the mysql deployment is up and running, now how do our pods and services 
inside the Kubernetes cluster connect to the running MySQL server? The answer is easy,
Kubernetes Service. A Kuberentes Service exposes an application, in our case 
the MySQL server to othe applications.

Let's write the Service config *mysql/service.yaml*:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql-database
spec:
  ports:
    - port: 3306
  selector:
    app: mysql-database
  clusterIP: None

```

Run *kubectl apply -f .mysql/service.yaml* to run the service.

This exposes the MySQL server so that other applications/services can connect 
using the 3306 port on *mysql-database* service name.


### Persistent Volume

The last thing that we missed is to configure the MySQL server so that even if
the server restarts, our data does not dissapear. In our current configuration,
we have not specified the place to store our data in case of restarts. 
Persistent Volume is a way in Kuberentes to store data in a persistent way. 
It provides an API to store data independent of the type of data storage 
i.e. Block Storage, NFS, etc and independent of the lifecycle of any pod that
uses it.

In short, we will be utilizing Persistent Volume(PV) and 
Persistent Volume Claims(PVC) features of Kuberentes to store data in AWS
Elastic Block Storage. We will also be utilizing Dynamic Volume Provisioning to
be able to request dynamically provisioned storage using Storage Class. This
allows storage volumes to be created on demand.

So, let's first create our storage class to *storage-class.yaml* which states 
what type of storage we will be using.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
reclaimPolicy: Retain
allowVolumeExpansion: true
mountOptions:
  - debug
volumeBindingMode: Immediate
```

Run *kubectl apply -f ./storage-class.yaml* to create a storage class with the
above configuration.

__Note: If you are running this config in your local kuberentes cluster like on a
Minikube or Docker Desktop, you will have to change the provisioner to 
*k8s.io/minikube-hostpath* or *docker.io/hostpath* depending on where the cluster
is hosted in your local system.__

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
provisioner: docker.io/hostpath 
reclaimPolicy: Retain
allowVolumeExpansion: true
mountOptions:
  - debug
volumeBindingMode: Immediate
```

Then we will be creating only a Persistent Volume Claim using the name of the
Storage Class previously defined i.e. *standard*. Save this configuration to
*mysql/persistent-volume-claim.yaml*.


```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pv-claim-db
spec:
  storageClassName: standard
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi

```

Run the command *kubectl apply -f ./mysql/persistent-volume-claim.yaml* to 
create a persistent volume and persistent volume claim.


## Putting it all together

Finally, we will mount the volume that we have just claimed to our mysql server.
So, the final deployment file will be:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-database
spec:
  selector:
    matchLabels:
      app: mysql-database
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: mysql-database
    spec:
      containers:
        - image: mysql:8.0
          name: mysql-database
          env:
            - name: MYSQL_ROOT_PASSWORD
              value: ${MYSQL_PASSWORD}
            - name: MYSQL_USER
              value: ${MYSQL_USERNAME}
            - name: MYSQL_PASSWORD
              value: ${MYSQL_PASSWORD}
            - name: MYSQL_DATABASE
              value: my_database
          ports:
            - containerPort: 3306
              name: mysql-database
          volumeMounts:
            - name: mysql-persistent-storage-ebs
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-persistent-storage-ebs
          persistentVolumeClaim:
            claimName: mysql-pv-claim-db

```

Running the command *kubectl apply -f ./mysql/deployment.yaml* should update 
the the previous MySQL server deployment with the new one which uses the newly
provisioned persistent volume.

Any data saved in the mysql server will now be persistent across server 
restarts.
<br/>
<br/>

