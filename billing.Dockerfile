FROM nginx
COPY dist/src /usr/share/nginx/html/src
COPY dist/share /usr/share/nginx/html/share
COPY dist/node_modules /usr/share/nginx/html/node_modules
COPY dist/billing /usr/share/nginx/html/billing