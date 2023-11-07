FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock* ./
RUN if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

CMD ["yarn", "dev"]
