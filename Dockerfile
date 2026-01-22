FROM node:22
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*
RUN pip3 install --break-system-packages --extra-index-url https://download.pytorch.org/whl/cpu torch torchvision numpy ultralytics supervision 
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
CMD node /usr/src/app/bin/www --watch
WORKDIR /