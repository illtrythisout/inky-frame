import sys, os, time, logging, requests
from PIL import Image
from io import BytesIO

# Define library and assets directories
lib_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lib')
if os.path.exists(lib_dir):
  sys.path.append(lib_dir)

from waveshare_epd import epd7in3f

# Initialization wrapper function to prevent multiple successive screen inits when auto running
_epd_instance = None
def get_epd():
    # Safely get or initialize the EPD object
    global _epd_instance

    if _epd_instance is None:
        _epd_instance = epd7in3f.EPD()
        _epd_instance.init()
    else:
        logging.info('EPD instance already active, skipping init.')

    return _epd_instance

# Setup logging
logging.basicConfig(level=logging.INFO)

# Image API
IMAGE_API = 'http://localhost:3000/images/get'

try:
  # Fetch image
  logging.info('Fetching image url from the inky-frame backend')
  response = requests.get(IMAGE_API)
  response.raise_for_status()
  data = response.json()
  image_url = data['url']

  logging.info('Downloading image from the cloudinary storage system')
  cloudinary_response = requests.get(image_url)
  cloudinary_response.raise_for_status()

  # Open image in memory
  image = Image.open(BytesIO(cloudinary_response.content)).convert('RGB')

  # Init display
  logging.info('Initializing screen')
  epd = get_epd()
  
  # Display img
  logging.info('Rendering image')
  epd.display(epd.getbuffer(image))

  time.sleep(2)

  # Deactivate screen
  logging.info('Going to sleep')
  epd.sleep()

except IOError as e:
    logging.info(e)
    
except KeyboardInterrupt:    
    logging.info("ctrl + c:")
    epd7in3f.epdconfig.module_exit(cleanup=True)
    exit()

except requests.exceptions.RequestException as e:
    print(f'Err: {e}')
