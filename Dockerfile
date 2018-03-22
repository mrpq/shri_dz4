FROM node:9.8-slim

# WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install

COPY . .

# ENV NODE_ENV=development
# EXPOSE 80

# CMD ["node", "app.js"]
CMD ["node",  "app.js"]
