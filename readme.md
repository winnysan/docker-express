## Inštalácia `Docker`

```bash
# Aktualizuj zoznam balíkov
sudo apt update

# Nainštaluj potrebné balíky
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# Pridaj Docker GPG kľúč
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Pridaj Docker repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Aktualizuj zoznam balíkov znova
sudo apt update

# Nainštaluj Docker
sudo apt install docker-ce docker-ce-cli containerd.io

# Povoľ docker pre aktuálneho uživateľa aby nemusel pouzívať príkaz sudo
sudo usermod -aG docker $USER

# Over, že je Docker správne nainštalovaný
docker --version

# Nainstaluj Docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Nastav oprávnenie
sudo chmod +x /usr/local/bin/docker-compose

# Over Docker-compose
docker-compose --version
```

## Nastavenie `Nginx`

```
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Nastavenie `.env*`

```
# Pre lokálne prostredie
.env.local

# Pre produkčné prostredie
.env.production
```

## Príkazy

```bash
# Zobrazenie zoznamu vytvorených images
docker images

# Zobrazenie zoznamu kontajnerov
docker ps -a

# Prezeranie logov
docker logs container-name

# Vytvorenie kontajnera podľa Dockerfile
docker build -t app-name .

# Spustenie kontajner
# mapuje port 3000 na hostiteľskom systéme (zadáva sa v Nginx)
# mapuje port 4000 v kontajneri (na ktorom beží aplikácia)
docker run -d -p 3000:4000 app-name

# Spustenie s možnosťou automatického restartu
# no (default) - kontajner sa automacky nespustí
# always - vždy sa snaží spustiť kontajner bez ohľadu na to ako sa zastavil
# on-failure - spustí ak skončí chybou (návratový kod nie je 0)
# unless-stopped - automacky sa spustí ak nie je manuálne zastavený
docker run -d --restart always -p 3000:4000 app-name

# Zastavenie kontajnera
docker stop app-name

# Vstupenie do kontajnera
docker exec -it container-name bash
docker exec -it container-name /bin/sh

# Vytvorenie image podľa docker-compose.yml
docker-compose build

# Vytvorenie bez cache
docker-compose build --no-cache

# Vytvorenie s detajlným výstupom
docker build --progress=plain --no-cache -t app-name .

# Spustenie kontajnera z vytvoreného image
docker-compose up 

# Združený príkaz
docker-compose up --build

# Zastavenie kontajnera
docker-compose down

# Zastavenie vrátane odstránenia volumes
docker-compose down -v

# Zastaví a odstráni všetky kontajnery, volumes, vrátane vytvorených images
docker-compose down -v --rmi all

# Odstránenie nevyužívaných obrazov
docker image prune -a

# Odstránenie nevyužívaných kontajnerov
docker container prune

# Odstránenie nevyužívaných volumes
docker volume prune

# Odstránenie nevyužívaných sietí
docker network prune

# Ostránenie všetkého
docker system prune -a --volumes
```
