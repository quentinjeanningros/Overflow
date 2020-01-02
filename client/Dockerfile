FROM node:10
EXPOSE 80
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
RUN npm install -g serve
COPY . .
RUN npm run build
CMD ["serve", "-l", "80", "-s", "/app/build"]