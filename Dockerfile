FROM node:20-alpine

# Install Cloud SQL Proxy
RUN wget -o cloud_sql_proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.11.3/cloud-sql-proxy.linux.amd64 && \
  chmod +x cloud_sql_proxy

# Create the app directory
RUN mkdir -p /home/app/node/api-skinsavvy

WORKDIR /home/app/node/api-skinsavvy

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile the code
RUN npm run compile

# Define environment variables
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG HOST=0.0.0.0
ENV HOST=${HOST}

ARG PORT
ENV PORT=${PORT}

ARG BUCKET_NAME
ENV BUCKET_NAME=${BUCKET_NAME}

ARG CLOUDSQL_CONNECTION_NAME

ENV CLOUDSQL_CONNECTION_NAME=${CLOUDSQL_CONNECTION_NAME}

# Expose the port where application will run on
EXPOSE ${PORT}

# Run Prisma generate and migrate, then start the app
CMD ["sh", "-c", "\
  ./cloud_sql_proxy \"${CLOUDSQL_CONNECTION_NAME}\" \
  until nc -z localhost 5432; do \
  echo 'Waiting for Cloud SQL Proxy...'; \
  sleep 1; \
  done && \
  npm run generate && \
  npm run migrate && \
  npm run start"]
