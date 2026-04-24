FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 
# (ฝั่ง DB Service ให้ EXPOSE 3001)
CMD ["node", "swit-gateway.js"]