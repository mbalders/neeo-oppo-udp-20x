'use strict';

const net = require('net');
const neeoapi = require('neeo-sdk');

const packageFile = require(process.cwd() + '/package.json');
const sdkOptions = packageFile.neeoSdkOptions || {};

if (sdkOptions.oppoIp == undefined) {
  console.log('[OPPO UDP-20X IP] No IP address defined. package.json -> sdkOptions -> oppoIp');
}

const OPPO_IP = sdkOptions.oppoIp;
const OPPO_PORT = 23;

var key;
var client;

const controller = {
  onButtonPressed: function onButtonPressed(name) {
    console.log(`[oppo-udp-20x] [Pressed] ${name}`);  
    
    key = '#';
    
    switch (name){
      //POWER ButtonGroup
      case "POWER ON":
        key += "PON";
        break;
      case "POWER OFF":
        key += "POF";
        break;
      
      //VOLUME ButtonGroup
      case "VOLUME UP":
        key += "VUP";
        break;
      case "VOLUME DOWN":
        key += "VDN";
        break;
      case "MUTE TOGGLE":
        key += "MUT";
        break;
  
      //Numpad ButtonGroup
      case "DIGIT 0":
        key += "NU0";
        break;
      case "DIGIT 1":
        key += "NU1";
        break;
      case "DIGIT 2":
        key += "NU2";
        break;
      case "DIGIT 3":
        key += "NU3";
        break;
      case "DIGIT 4":
        key += "NU4";
        break;
      case "DIGIT 5":
        key += "NU5";
        break;
      case "DIGIT 6":
        key += "NU6";
        break;
      case "DIGIT 7":
        key += "NU7";
        break;
      case "DIGIT 8":
        key += "NU8";
        break;
      case "DIGIT 9":
        key += "NU9";
        break;
  
      //Controlpad ButtonGroup
      case "CURSOR UP":
        key += "NUP";
        break;
      case "CURSOR DOWN":
        key += "NDN";
        break;
      case "CURSOR LEFT":
        key += "NLT";
        break;
      case "CURSOR RIGHT":
        key += "NRT";
        break;
      case "CURSOR ENTER":
        key += "SEL";
        break;
  
      //Color Buttons ButtonGroup
      case "FUNCTION RED":
        key += "RED";
        break;
      case "FUNCTION GREEN":
        key += "GRN";
        break;
      case "FUNCTION BLUE":
        key += "BLU";
        break;
      case "FUNCTION YELLOW":
        key += "YLW";
        break;
  
      //Menu and Back ButtonGroup
      case "MENU":
        key += "MNU";
        break;
      case "BACK":
        key += "RET";
        break;
  
      //Channel Zapper ButtonGroup
      case "CHANNEL UP":
        key += "PUP";
        break;
      case "CHANNEL DOWN":
        key += "PDN";
        break;
  
      //Transport ButtonGroup
      case "PLAY":
        key += "PLA";
        break;
      case "PAUSE":
        key += "PAU";
        break;
      case "STOP":
        key += "STP";
        break;
  
      //Transport Search ButtonGroup
      case "REVERSE":
        key += "REV";
        break;
      case "FORWARD":
        key += "FWD";
        break;
  
      //Transport Scan ButtonGroup
      case "PREVIOUS":
        key += "PRE";
        break;
      case "NEXT":
        key += "NXT";
        break;
  
      case "PURE AUDIO":
        key += "PUR";
        break;
  
      case "CLEAR":
        key += "CLR";
        break;
      case "GOTO":
        key += "GOT";
        break;
      
      case "TOP MENU":
        key += "TTL";
        break;
      case "OPTION":
        key += "OPT";
        break;
  
      case "HOME MENU":
        key += "HOM";
        break;
      case "OPEN":
        key += "EJT";
        break;
      case "DIMMER":
        key += "DIM";
        break;
      
      case "INFO":
        key += "OSD";
        break;
      case "SETUP":
        key += "SET";
        break;
      case "PIC":
        key += "SEH";
        break;
      case "RESOLUTION":
        key += "HDM";
        break;
      
      case "AUDIO":
        key += "AUD";
        break;
      case "SUBTITLE":
        key += "SUB";
        break;
      case "ZOOM":
        key += "ZOM";
        break;
      case "AB REPLAY":
        key += "ATB";
        break;
      case "REPEAT":
        key += "RPT";
        break;
      
      //these codes are undocumented
      case "INPUT":
        key += "SRC";
        break;
      case "HDR":
        key += "HDR";
        break;
      
    }
  
    key += '\r\n';
  
    client = new net.Socket()
      .on('data', function(data) {
        console.log(`[oppo-udp-20x] [Response] ${data}`);
        client.destroy(); // kill client after server's response
      })
      .on('error', function(e) {
        console.log(`[oppo-udp-20x] [Error] ${e}`);
      })
      .connect(OPPO_PORT, OPPO_IP, function(){
        console.log(`[oppo-udp-20x] [Sending] ${JSON.stringify(key)}`);
        client.write(key);
      });
  }
};

const oppoUdp20x = neeoapi.buildDevice('OPPO UDP-20X IP')
.setManufacturer('OPPO')
.addAdditionalSearchToken('UDP-203')
.addAdditionalSearchToken('UDP-205')
.setType('MEDIAPLAYER')

.addButtonGroup('POWER')
.addButtonGroup('VOLUME')
.addButtonGroup('Numpad')
.addButtonGroup('Controlpad')
.addButtonGroup('Color Buttons')
.addButtonGroup('Menu and Back')
.addButtonGroup('Channel Zapper')
.addButtonGroup('Transport')
.addButtonGroup('Transport Search')
.addButtonGroup('Transport Scan')

.addButton({ name: 'PURE AUDIO', label: 'Pure Audio' })

.addButton({ name: 'CLEAR', label: 'Clear' })
.addButton({ name: 'GOTO', label: 'Go To' })

.addButton({ name: 'TOP MENU', label: 'Top Menu' })
.addButton({ name: 'OPTION', label: 'Option' })

.addButton({ name: 'HOME MENU', label: 'Home Menu' })
.addButton({ name: 'OPEN', label: 'Open' })
.addButton({ name: 'DIMMER', label: 'Dimmer' })

.addButton({ name: 'INFO', label: 'Info' })
.addButton({ name: 'SETUP', label: 'Setup' })
.addButton({ name: 'PIC', label: 'Pic' })
.addButton({ name: 'RESOLUTION', label: 'Resolution' })

.addButton({ name: 'AUDIO', label: 'Sutio' })
.addButton({ name: 'SUBTITLE', label: 'Subtitle' })
.addButton({ name: 'ZOOM', label: 'Zoom' })
.addButton({ name: 'AB REPLAY', label: 'AB Replay' })
.addButton({ name: 'REPEAT', label: 'Repeat' })

.addButton({ name: 'INPUT', label: 'Input' })
.addButton({ name: 'HDR', label: 'HDR' })

.addButtonHander(controller.onButtonPressed);

module.exports = {
  devices: [oppoUdp20x]
}
