FROM node:18.15.0

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN  npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

RUN npm install prisma -g

CMD [ "prisma", "migrate", "deploy" ]
CMD [ "prisma", "db", "seed" ]
CMD [ "node", "dist/main" ]