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

try:
  # Init display
  logging.info('Initializing screen')
  epd = get_epd()
  
  # Clearing screen
  logging.info('Clearing screen')
  epd.Clear()

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