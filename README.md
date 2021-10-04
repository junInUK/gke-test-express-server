# Deploy a simple Node.js app on Kubernetes (GKE)

![](kubernetes.png)

## Deploy on Kubernetes (GKE)


source article click here https://itnext.io/deploying-a-node-js-app-to-the-google-kubernetes-engine-gke-d6af1f3a954c

I wanna show you how quickly and easily you can deploy your app to the Kubernetes on Google Kubernetes Engine (GKE).
Create a new Kubernetes cluster


Enter a name for your cluster, location, number of nodes and machine type. Then click More Options.


If you need to automatically add new nodes to the cluster, then click Enable autoscaling.


You can allow access to some APIs from the cluster. For example, I allow access to Google Cloud Storage (GCS).


After your cluster has been created, click Connect.




Now you’ll see a Cloud Shell with the command, press Enter to execute it and get GKE credentials. After that, you can execute any commands with kubectl.
For example, let’s check the nodes of a cluster.


Push docker image to Google Container Registry
I’ll use my GitHub repo which includes a simple Node.js app, Dockerfile, and deployment.yaml. All these commands I’ll enter in Cloud Shell.
git clone https://github.com/sonufrienko/gke-simple-app
git clone
git@github.com:junInUK/gke-test-express-server.git
cd gke-simple-app
Replace [PROJECT_ID] in deployment.yaml with your GCP project ID.
Get credentials to Google Container Registry
gcloud auth configure-docker
Build and push the docker image to Google Container Registry
docker build -t gcr.io/[PROJECT_ID]/app:v1 .
(when you update the code, you can update the image to app:v2 etc.)
docker push gcr.io/[PROJECT_ID]/app:v1
(when you update the code, you can update the image to app:v2 etc.)
Deploy docker image to Kubernetes
Deployment YAML file contains two parts:
Deployment - describe containers to be deployed
Service - will create a LoadBalancer to expose our containers to the internet


Create deployment and service.
kubectl apply -f deployment.yaml --record
Check deployment process
kubectl get deployments
Check pods (containers)
kubectl get pods
Check service and copy external IP address (LoadBalancer)
kubectl get services


Now, you can open in your browser this URL
http://<EXTERNAL-IP>/encrypt?secret=abc&message=i-love-you
How to release a new version?
Push a new version of docker image to the Container Registry, change docker image version 
image: gcr.io/hello-world-327819/app:v1(update v1 to correct version)
in deployment.yaml and then run this command to set desired deployment state.
kubectl apply -f deployment.yaml --record
How to rollback new release?
kubectl rollout undo deployment/my-app-deployment
Useful tips
Check container logs
kubectl logs <POD NAME>
Go inside container
kubectl exec -it <POD NAME> bash
Delete a whole deployment
kubectl delete deployment my-app-deployment
Set horizontal pod autoscaling policy for deployment
kubectl autoscale deployment <DEPLOYMENT_NAME> --max 6 --min 1 --cpu-percent 60
Check horizontal pod autoscaling policy (HorizontalPodAutoscaler object)
kubectl get hpa
Check pod Events to investigate issues with pods deployment, polling docker image, etc.
kubectl get pods
kubectl describe pods/<POD_NAME>
What’s next?
Now you know how to create a GKE cluster, deploy containers, release a new version and rollback, set autoscale policy and how to investigate problems.
You can also read more about these topics:
Manage Secrets
Labels
Namespace
Application health check
other Service types (ClusterIP, NodePort, ExternalName)
Ingress



## Run

```shell
git clone https://github.com/sonufrienko/gke-simple-app
cd gke-simple-app/app
npm i
npm run start
```


## App

The app built with Node.js and allow AES encryption/decryption using HTTP request.

#### Browser

Encrypt a "message" with "secret"

```http://localhost:4000/encrypt?secret=8650&message=i-love-you```

Decrypt a "message" with "secret"

```http://localhost:4000/decrypt?secret=8650&message=12840030619419b8d8ec4fe61e275d99```

#### CURL

Encrypt a "message" with "secret"

```shell
curl -G 'http://localhost:4000/encrypt' \
-d secret=8650 \
-d message=i-love-you
```

Decrypt a "message" with "secret"

```shell
curl -G 'http://localhost:4000/decrypt' \
-d secret=8650 \
-d message=12840030619419b8d8ec4fe61e275d99
```
