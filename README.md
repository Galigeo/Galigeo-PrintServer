# 1. gaia.properties configuration
print_puppeteer_url=url of the server ==> http://\<**print-server-name-or-ip**\>:3000/puppeteer

Example from \<GALIGEO_HOME\>/config/**gaia.properties**:

**print_puppeteer_url**=http\\://ggo-print-server\\:3000/puppeteer

# 2. How to install and run with Docker
## 2.1 How to build docker image from **Dockerfile** and run it ?

- Build docker image from Dockerfile:

**docker build . -t galigeo-print-server -f ./Dockerfile** 

- Run it in container:

**docker run --rm -p 3000:3000 galigeo-print-server**

## 2.2 How to build docker image **galigeo-print-server.tar**  and run it in another docker ?

### **A - Build galigeo-print-server.tar on your docker**
- Build docker image from Dockerfile:

**docker build . -t galigeo-print-server -f ./Dockerfile** 

- Save it locally as tar file:

**docker save -o galigeo-print-server.tar galigeo-print-server:latest** 

### **B - Run galigeo-print-server.tar on another docker (e.g. production docker)**

- Get **galigeo-print-server.tar** from Galigeo

- Load it in docker:

**docker load -i galigeo-print-server.tar**

- Run it in container:

**docker run --rm -p 3000:3000 galigeo-print-server**

# 3. How to install and run on Windows

- Install nodeJs / build galigeo-print-server:

**npm install**

- Run galigeo-print-server:

**npm run start**


# 4. Test server is running
http://\<**print-server-name-or-ip**\>:3000/alive

Output : *{"message":"Galigeo Print Server is up and running on container port 3000"}*

# 5. Docker Logs set up
## 5.1 "local" Log driver set up
By default Docker uses the "json-file" log driver:

- No log rotation and no size limit -> can cause a significant amount of disk space to be used.
- "json-file" log driver is used for backward compatibility with older versions of Docker, and for situations where Docker is used as runtime for Kubernetes.

**In other situations, "local" log driver is recommended** as it uses by default log rotation with an overall size limit of 100MB.

### A - **How to run galigeo-print-server with "local" log driver ?**

**docker run --rm -p 3000:3000 *--log-driver local* galigeo-print-server**

Info - default configuration for "local" log driver is:
- **max-size=20m**
- **max-file=5**
- **compress=true** (rotated log files are compressed)


Find below an example that overrides default config:

docker run --rm -p 3000:3000 *--log-driver local --log-opt max-size=10m --log-opt max-file=3 --log-opt compress=false* galigeo-print-server

### B - **How to get the log driver** used by galigeo-print-server container ? 

**docker inspect -f '{{.HostConfig.LogConfig.Type}}' <CONTAINER_ID>**

Output: *local*

## 5.2 Get the Logs
### **A - Get galigeo-print-server <CONTAINER_ID>**

**docker ps** or **docker ps -a -q  --filter ancestor=galigeo-print-server**

Ouput: *843a9085753b*

### **B - Get containers logs**

Find below some examples. 
- Display the logs with timestamps

**docker logs --timestamps <CONTAINER_ID>**

- Get the logs with timestamps in galigeo-print-server.log file

**docker logs --timestamps <CONTAINER_ID> > galigeo-print-server.log**

- Get the logs since 2023-06-26

**docker logs --timestamps --since 2023-06-26 <CONTAINER_ID> > galigeo-print-server.log**

- Get the logs for the last 45 minutes

**docker logs --timestamps --since 45m <CONTAINER_ID> > galigeo-print-server.log**
 