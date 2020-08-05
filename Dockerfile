FROM node:12.18.3
RUN apt-get update && apt-get install -y ffmpeg
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]