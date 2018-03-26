FROM node:9

COPY package.json package.json
RUN npm install
RUN git clone --mirror https://github.com/mrpq/shri_dz4.git repos/demo
COPY . .

ENV REPOS_DIR=repos
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node",  "app.js"]
