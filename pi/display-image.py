import sys, os, time
from PIL import Image, ImageDraw, ImageFont

# Define library and assest directories
libdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lib')
picdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'pic')
if os.path.exists(libdir):
  sys.path.append(libdir)

from waveshare_epd import epd7in3f

import logging
logging.basicConfig(level=logging.INFO)

try:
  # init
  logging.info('Display Image Script:')
  epd = epd7in3f.EPD()

  logging.info('Initialising and clearing scren...')
  epd.init()
  epd.Clear()
  
  # Display img
  logging.info('Rendering image...')
  image_path = os.path.join(picdir, 'image.png')
  image = Image.open(image_path).convert('RGB')
  epd.display(epd.getbuffer(image))

  logging.info('Image rendered, it will show for 5s')
  time.sleep(5)

  # Clearing screen
  logging.info('Clearing screen')
  epd.Clear()

  logging.info('Going to sleep')
  epd.sleep()

except IOError as e:
    logging.info(e)
    
except KeyboardInterrupt:    
    logging.info("ctrl + c:")
    epd7in3f.epdconfig.module_exit(cleanup=True)
    exit()