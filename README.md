# 1. Config gaia.properties
print_puppeteer_url=url of the server ==> http://localhost:3000/puppeteer

# 2. How to Install and run with Docker
# 2.1 How to build docker image from **Dockerfile** and run it ?

- Build docker image from Dockerfile:

**docker build . -t galigeo-print-server -f ./Dockerfile** 

- Run it in container:

**docker run --rm -p 3000:3000 galigeo-print-server**

# 2.2 How to build docker image **galigeo-print-server.tar**  and run it in another docker ?

**A - Build galigeo-print-server.tar on your docker**
- Build docker image from Dockerfile:

**docker build . -t galigeo-print-server -f ./Dockerfile** 

- Save it locally as tar file:

**docker save -o galigeo-print-server.tar galigeo-print-server:latest** 

**B - Run galigeo-print-server.tar on another docker (e.g. production docker)**

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

