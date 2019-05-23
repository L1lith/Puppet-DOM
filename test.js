const createWorker = require('./source/createWorker')
createWorker(require("./puppet-config.js")).catch(console.log)
