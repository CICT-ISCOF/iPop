curl -o- "https://get.docker.com" | bash

sudo groupadd docker

sudo usermod -aG docker $USER

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo ufw enable
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

sudo apt update \
    && sudo apt install -y gnupg gosu curl ca-certificates zip unzip git supervisor sqlite3 libcap2-bin libpng-dev python2 \
    && mkdir -p ~/.gnupg \
    && chmod 600 ~/.gnupg \
    && echo "disable-ipv6" >> ~/.gnupg/dirmngr.conf \
    && sudo apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E5267A6C \
    && sudo apt-key adv --homedir ~/.gnupg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C300EE8C \
    && echo "deb http://ppa.launchpad.net/ondrej/php/ubuntu hirsute main" > /etc/apt/sources.list.d/ppa_ondrej_php.list \
    && sudo apt update \
    && sudo apt install -y php7.4-cli php7.4-dev \
       php7.4-pgsql php7.4-sqlite3 php7.4-gd \
       php7.4-curl php7.4-memcached \
       php7.4-imap php7.4-mysql php7.4-mbstring \
       php7.4-xml php7.4-zip php7.4-bcmath php7.4-soap \
       php7.4-intl php7.4-readline php7.4-pcov \
       php7.4-msgpack php7.4-igbinary php7.4-ldap \
       php7.4-redis php7.4-xdebug \
    && php -r "readfile('http://getcomposer.org/installer');" | sudo php -- --install-dir=/usr/bin/ --filename=composer \
    && sudo apt install -y mysql-client \
    && sudo apt -y autoremove \
    && sudo apt clean \
    && sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

sudo apt update

sudo apt install nginx

sudo rm /etc/nginx/sites-available/default

sudo cp ./nginx/nginx.conf /etc/nginx/sites-available/default

sudo nginx -t

sudo systemctl nginx restart

sudo apt install snapd

sudo snap install core; sudo snap refresh core

sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/local/bin/certbot

cd ./backend

sudo chmod o+w ./storage -R

cp .env.docker .env

composer install

php artisan key:generate
