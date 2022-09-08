//import dependencies
const express = require('express');
const cors = require('cors');

//import middlewares
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');

//Istance and port of Express needed
const app = express();
const port  = 3000;

//Middlewares json
app.use(express.json());

//import main router
const routerApi = require('./routes');

app.get('/', (req, res) => {
    res.send('hola mi server en express');
});

routerApi(app);

app.listen(port, () => {
    console.log('listen at port: ' + port)
});

//middlewares completed
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const whiteList = ['https://localhost:8000'];
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('Not access'))
        }
    }
};
app.use(cors(options));
