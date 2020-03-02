FROM node:10-alpine

WORKDIR /app

COPY . .
# install Firebase CLI Tools
RUN npm install -g firebase-tools eslint
RUN mkdir -p root/.config/configstore/
RUN cd functions && \
    npm install

ENV TOKEN 1//0ecx-Jf_IEWh_CgYIARAAGA4SNwF-L9IrKpZNehiYrEscsbD3V0HVE28HnU_wEHGUmdZxpdyexRbPz-jKpFd_EPAVGfWvcPKf0co
COPY auths/firebase-tools.json root/.config/configstore/firebase-tools.json
COPY auths/update-notifier-firebase-tools.json root/.config/configstore/update-notifier-firebase-tools.json
COPY auths/update-notifier-npm.json root/.config/configstore/update-notifier-npm.json
# settings for runtime emulator
ENV HOST 0.0.0.0
EXPOSE 5000

# settings for Firebase login
EXPOSE 9005

# i can deploy with firebase deploy --token $TOKEN