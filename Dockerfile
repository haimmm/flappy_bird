FROM node:lts-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

CMD ["npm", "run", "host"]
EXPOSE 3000