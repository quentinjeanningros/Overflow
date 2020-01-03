FROM node:10
EXPOSE 80
WORKDIR /app
COPY . .
RUN mkdir files
RUN npm install --silent
CMD ["node", "server.js"]