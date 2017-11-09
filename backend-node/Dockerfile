FROM node:8

WORKDIR /src/app
COPY package.json ./
RUN ["npm", "install"]
COPY ./src ./
CMD ["node", "--harmony", "./app.js"]
