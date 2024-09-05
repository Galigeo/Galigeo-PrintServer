const Service = require('node-windows').Service;

const svc = new Service({
  name: 'GaligeoPrintService',
  description: 'GaligeoPrintServer Node.js app as a Windows service.',  
  script: require('path').resolve(__dirname + '/index_win.js')
});


// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('GaligeoPrintService Uninstall complete.');  
});

// Uninstall the service.
svc.uninstall();