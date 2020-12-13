let Gpio
const express = require('express')
const router = express.Router()

// Onoff cannot be installed on devices without Gpio
try {
  Gpio = require('onoff').Gpio
} catch (err) {
  Gpio = {
    accessible: false
  }
}

let pin_up, pin_down

if (Gpio.accessible) {
  pin_up = new Gpio(26, 'out')
  pin_down = new Gpio(13, 'out')
} else {
  pin_up = {
    write: value => {
      console.log('virtual shutter up now uses value: ' + value)
    }
  }
  pin_down = {
    write: value => {
      console.log('virtual shutter down now uses value: ' + value)
    }
  }
}

router.get('/somfy_up', function (req, res) {
  move_shutters('up', 2000)
  res.redirect('/')
})

router.get('/somfy_down', function (req, res) {
  move_shutters('down', 2000)
  res.redirect('/')
})

function move_shutters (direction, millisec) {
  if (direction === 'up') {
    up(1)
    setTimeout(up, millisec, 0)
    console.log('Shutters going up...')
  } else if (direction === 'down') {
    down(1)
    setTimeout(down, millisec, 0)
    console.log('Shutters going down...')
  }
}

function up (s) {
  pin_up.writeSync(s)
}

function down (s) {
  pin_down.writeSync(s)
}

module.exports = {
  router: router,
  move_shutters: move_shutters
}
