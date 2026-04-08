FROM node:18

WORKDIR /app

COPY . .

RUN cd backend && npm install
RUN cd frontend && npm install

EXPOSE 3000

CMD ["node", "backend/server.js"]