FROM node:8-alpine as builder

WORKDIR /home/node/app
COPY . .
RUN npm install && \
    npm run build

FROM pierrezemb/gostatic:latest

COPY --from=builder /home/node/app/dist/ /srv/http/
