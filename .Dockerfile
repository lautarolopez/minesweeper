FROM node:16-alpine

WORKDIR /home/app
COPY package.json /home/app/
COPY package-lock.json /home/app/
COPY . /home/app
RUN npm install 

EXPOSE 3001
CMD npm start