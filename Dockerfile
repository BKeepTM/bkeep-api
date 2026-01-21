FROM node:22
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*
RUN pip3 install ultralytics roboflow --break-system-packages
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
CMD node /usr/src/app/bin/www --watch
WORKDIR /