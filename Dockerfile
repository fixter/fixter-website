From node:latest
MAINTAINER Geoffrey Gross <geoffrey@tealpass.com>

RUN cd $(npm root -g)/npm \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

Add . /src

WORKDIR /src

RUN npm install

#Build Code
RUN npm run build
EXPOSE 3000

RUN npm install -g nodemon

# run
CMD ["npm", "start"]
