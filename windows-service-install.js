const Service = require('node-windows').Service;

const svc = new Service({
  name: 'GaligeoPrintService',
  description: 'GaligeoPrintServer Node.js app as a Windows service.',  
  script: require('path').resolve(__dirname + '/index_win.js')
});

svc.on('install', () => {  
  console.log('GaligeoPrintService Install complete.');

  svc.start();
  console.log('GaligeoPrintService started.');
});

if (!svc.exists){
  svc.install();
}else{
  console.log('GaligeoPrintService already exists.');
}

  

