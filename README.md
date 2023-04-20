# Install with Docker
# Build docker Image

docker build . -t headless-chrome -f ./Dockerfile 

# Run it in container

docker run --rm -p 3000:3000 headless-chrome



# Install on Windiws

# install nodeJs
npm install

npm run start

