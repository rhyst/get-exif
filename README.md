# get-exif

A simple node server to provide exif data on statically hosted images.

## Installation:

Use it as a docker container. Example docker-compose config:

```
version: '3.4'
services:
  get-exif:
    build: ./
    container_name: get-exif
    image: rhyst/get-exif
    restart: always
    volumes:
     - /path/to/public/images:/app/images:ro
    ports:
     - "8000:3001"
```

And then reverse proxy it using nginx or caddy.

## Usage

Takes a path as a query string paramter:

```
curl https://exif.somesite.com?image=/images/subfolder/image.jpg
```

Returns a json object with the exif data for that image.
