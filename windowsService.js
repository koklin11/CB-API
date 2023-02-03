//npm install node-windows

const Service = require('node-windows').Service
const svc = new Service({
    name:"nodeBasicServer",
    description:"CB API",
    script: "C:\\Users\\joelim\\Documents\\joelim\\TAISIN\\Node\\CB API\\server.js"
})

svc.on('install', function(){
    svc.start()
})

svc.install()