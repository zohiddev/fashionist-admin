FROM node:lts

# Set TimeZone correctly
ENV TZ=Asia/Tashkent
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app
# Install app dependencies
COPY . /usr/src/app

RUN yarn install

EXPOSE 80
ENV HOST 0.0.0.0
CMD [ "yarn","run", "build" ] 
CMD [ "yarn","run", "start" ] 
