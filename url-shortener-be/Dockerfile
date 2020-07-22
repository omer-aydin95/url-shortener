FROM node:12.18.2
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8081
CMD ["node", "./dist/bundle.js"]
