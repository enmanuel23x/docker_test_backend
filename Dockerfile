FROM node:14-alpine as base

WORKDIR /usr/src/app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . .

ARG LOG_ACTIVE=false
ARG PORT=2000

EXPOSE 2000

# start app
CMD ["npm", "start"]

#docker build -t backend:latest .
#docker run -p 2000:2000 -d backend:latest