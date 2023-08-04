# 1. gaia.properties configuration
**print_server_url**=url of the print server ==> http://\<**print-server-name-or-ip**\>:3000/print

Example from \<GALIGEO_HOME\>/config/**gaia.properties**:

**print_server_url**=http\\://ggo-print-server\\:3000/print

# 2. How to install and run with Docker
## 2.1 Pre-requisite - **Minimal Docker version: 24.0.2**

Docker image **galigeo-print-server.tar is build**, at jenkins, **with Docker 24.0.2**.

**To run it, Docker minimal version is 24.0.2** (current version on 2023 June).

To know Docker version, run: 

**docker version**

## 2.2 How to build docker image from **Dockerfile** and run it ?

- Build docker image from Dockerfile:

**docker build . -t galigeo-print-server -f ./Dockerfile** 

- Run it in container:

~~**docker run --rm -p 3000:3000 galigeo-print-server**~~
--> Prefer the one with the more efficient log driver:

**docker run --rm -p 3000:3000 --log-driver local galigeo-print-server**

## 2.3 How to build docker image **galigeo-print-server.tar**  and run it in another docker ?

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

~~**docker run --rm -p 3000:3000 galigeo-print-server**~~
--> Prefer the one with the more efficient log driver:

**docker run --rm -p 3000:3000 --log-driver local galigeo-print-server**

# 3. Test server is running
http://\<**print-server-name-or-ip**\>:3000/alive

Output : *{"message":"Galigeo Print Server is up and running on container port 3000"}*

# 4. Docker Logs set up
## 4.1 "local" Log driver set up
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

## 4.2 Get the Logs
### **A - Get galigeo-print-server <CONTAINER_ID>**

**docker ps** 

or

**docker ps -a -q  --filter ancestor=galigeo-print-server**

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
 
 # 5. Docker clean up
 ## 5.1 Stop galigeo-print-server container
 - Get galigeo-print-server <CONTAINER_ID>
 
 **docker ps** or **docker ps -a -q  --filter ancestor=galigeo-print-server**

 - Stop galigeo-print-server container

**docker stop <CONTAINER_ID>**

 ## 5.2 Remove galigeo-print-server image
 - Get galigeo-print-server <IMAGE_ID>
 
 **docker images**

 - Remove image from container registry

 **docker rmi <IMAGE_ID>**

 # Appendix
 ## List packages installed in galigeo-print-server container

 **docker exec -i <CONTAINER_ID> dpkg -l**

 Output example:\
*...\
ii  gnupg-utils                   2.2.40-1.1                     amd64        GNU privacy guard - utility programs\
 **ii  google-chrome-stable          115.0.5790.110-1               amd64        The web browser from Google**\
 ii  gpg                           2.2.40-1.1                     amd64        GNU Privacy Guard -- minimalist public key operations\
 ...*
