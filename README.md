# Inky Frame

A personal DIY project that combines a RaspberryPi and an E-ink screen to create a custom electronic picture frame.  
This project includes code to control the screen alongside a full-stack web interface to process and upload images to the **Inky Frame**

## Components

- [Raspberry Pi Zero 2 W](https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/)
- [7.3inch ACeP 7-Color E-Paper E-Ink Display Module, 800×480 Pixels, SPI Communication](https://www.waveshare.com/product/displays/e-paper/epaper-1/7.3inch-e-paper-hat-f.htm)

## Backend

The inky pi runs an api with Node.js on the pi itself that delivers images to the frontend UI and the script to control the screen

### List of the API endpoints provided by the backend:

- **Get all images:** (GET) /images
- **Get a random image:** (GET) /images/random
- **Delete image:** (DELETE) /images/:imageId
- **Upload image:** (POST) /albums/:albumId/images (the image needs to be in a form with the attribute `enctype="multipart/form-data"` and the input should have the attributes `type="file" name="file"`)
- **Get all albums:** (GET) /albums
- **Get album:** (GET) /albums/:albumId
- **Get a random image in an albums:** (GET) /albums/:albumId/random
- **Create album:** (POST) /albums (the name should be in the request.body `{name: "New Album"}`)
- **Update album by id:** (PUT) /albums/:albumId (the name should be in the request.body `{name: "New Name"}`)
- **Delete album:** (DELETE) /albums/:albumId
