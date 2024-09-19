# Použi oficiálny Node.js image
FROM node:20

# Nastav pracovný adresár
WORKDIR /usr/src/app

# Skopíruj package.json a nainštaluj závislosti
COPY package*.json ./
RUN npm install

# Skopíruj zvyšok aplikácie
COPY . .

# Aplikácia beží na porte 3000
EXPOSE 4000

# Spusti aplikáciu
CMD ["node", "src/app.js"]
