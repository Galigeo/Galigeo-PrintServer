# 1. Config gaia.properties
print_puppeteer_url=url of the server ==> http://localhost:3000/puppeteer

# 2. Install with Docker
# 2.1 Build docker Image

docker build . -t headless-chrome -f ./Dockerfile 

# 2.2 Run it in container

docker run --rm -p 3000:3000 headless-chrome



# 2. Install on Windiws

# 2.1 install nodeJs
npm install

npm run start

