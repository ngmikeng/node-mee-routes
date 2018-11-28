FROM node:10.13-alpine
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5858
# CMD npm start