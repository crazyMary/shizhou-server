FROM node:12.13.1
COPY . /app
WORKDIR /app
RUN apt-get update && apt-get install -y yarn && yarn
EXPOSE 3333
CMD npm run prd
