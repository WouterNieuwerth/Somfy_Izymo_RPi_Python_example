import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

pin_up = 26
pin_down = 13

GPIO.setup(pin_up, GPIO.OUT)
GPIO.setup(pin_down, GPIO.OUT)

GPIO.output(pin_up, GPIO.LOW)
GPIO.output(pin_down, GPIO.LOW)

def move_shutters (direction, sec):
    if (direction == 'up'):
        GPIO.output(pin_up, GPIO.HIGH)
        time.sleep(sec)
        GPIO.output(pin_up, GPIO.LOW)
    if (direction == 'down'):
        GPIO.output(pin_down, GPIO.HIGH)
        time.sleep(sec)
        GPIO.output(pin_down, GPIO.LOW)

move_shutters('down', 20)