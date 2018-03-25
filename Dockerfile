FROM node:9.8-slim

# WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
COPY . .

# ENV NODE_ENV=production
ENV REPOS_DIR=repos
EXPOSE 3000

# CMD ["node", "app.js"]
CMD ["node",  "app.js"]
