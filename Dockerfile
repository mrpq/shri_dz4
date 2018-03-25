FROM node:9

# WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
RUN git clone --mirror https://github.com/mrpq/shri_dz4.git repos/demo
COPY . .

# ENV NODE_ENV=production
ENV REPOS_DIR=repos
EXPOSE 3000

# CMD ["node", "app.js"]
CMD ["node",  "app.js"]
