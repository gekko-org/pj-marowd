FROM node:10-alpine

WORKDIR /app

# install Firebase CLI Tools
RUN npm install -g firebase-tools eslint
ADD config.json /root/.config/configstore/@google-cloud/functions-emulator/config.json
COPY . .
RUN cd functions && \
    npm install
# settings for runtime emulator
ENV HOST 0.0.0.0
ENV GOOGLE_APPLICATION_CREDENTIALS "/app/pj-marowd-key.json"
EXPOSE 5000

# settings for Firebase login
EXPOSE 9005

# i can deploy with firebase deploy --token $TOKEN
# firebase serve -o 0.0.0.0