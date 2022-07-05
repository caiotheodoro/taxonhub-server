FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install --prefix assets && \
  npm --prefix ./assets ci --progress=false --no-audit --loglevel=error

COPY . . 

EXPOSE 3333

CMD ["npm", "run", "dev"] 

