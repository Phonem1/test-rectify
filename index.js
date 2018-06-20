const restify = require('restify');
const _ = require('lodash');
const errors = require('restify-errors');
const corsMiddleware = require('restify-cors-middleware');

const port = process.env.PORT || 3000;
const controller = require('./products.controller');
const seagatedata = require('./datareport.controller');
const seagateuser = require('./user.controller');

const server = restify.createServer({
    name: 'restify headstart'
});

const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['X-App-Version'],
    exposeHeaders: []
});

server.use(restify.plugins.bodyParser());

server.pre(cors.preflight);
server.use(cors.actual);

server.pre((req, res, next) => {
    console.info(`${req.method} - ${req.url}`);
    return next();
});

// login
server.get('api/exampleloginreq', (req,res,next) => {
    res.send(200, seagateuser.sendexamplelogin());
    return next();
});
server.get('api/exampleloginres', (req,res,next) => {
    res.send(200, seagateuser.responseexampleloginifsuccess());
    return next();
});
server.get('api/user/:id', (req,res,next) => {
    if (!req.params.id) {
        return next(new errors.BadRequestError());
    }
    try {
        const user = seagateuser.getUserById(req.params.id);
        res.send(200, user);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});
server.get('api/createusers', (req,res,next) => {
    seagateuser.create();
    res.send(200, seagateuser.getAllUsers());
    return next();
});
server.post('api/login', (req,res,next) => {
    if (!req.body || 
        !req.body.maxResponseSeconds || 
        !req.body.password ||
        !req.body.userId ) {
        return next(new errors.BadRequestError());
    }
    const loginuser = seagateuser.login(
        req.body.userId, 
        req.body.password
    );
    const loginuser1 = _.omit(loginuser, ['password']);
    if ( loginuser ) {
        res.send(200, _.merge(loginuser1, {
            'errorFlag': false,
            'errorCode': 0,
            'errorMessage':'Success',
        }));
    }
    return next();
});
// submit
server.get('api/examplesubmitreq', (req,res,next) => {
    res.send(200, seagatedata.sendexamplesubmit());
    return next();
});
server.get('api/examplesubmitres', (req,res,next) => {
    res.send(200, seagatedata.responseexamplesubmitifsuccess());
    return next();
});
server.get('api/reports', (req,res,next) => {
    res.send(200, seagatedata.getAll());
    return next();
});
server.post('api/reports', (req,res,next) => {
    if (!req.body || 
        !req.body.Cage_ID || 
        !req.body.userid || 
        !req.body.fromTime ||
        !req.body.toTime ||
        !req.body.cleaningStatus ) {
        return next(new errors.BadRequestError());
    }
    seagatedata.create(
        req.body.Cage_ID, 
        req.body.userid,
        req.body.fromTime,
        req.body.toTime,
        req.body.cleaningStatus);
    res.send(201, {
        'errorFlag': false,
        'errorCode': 0,
        'errorMessage': 'Success'
    });
    return next();
});

// tests
server.get('api/products', (req, res, next) => {
    res.send(200, controller.getAll());
    return next();
});

server.get('api/products/:id', (req, res, next) => {
    if (!req.params.id) {
        return next(new errors.BadRequestError());
    }
    try {
        const product = controller.getById(+req.params.id);
        res.send(200, product);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.post('api/products', (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.id) {
        return next(new errors.BadRequestError());
    }
    controller.create(+req.body.id, req.body.name);
    res.send(201);
    return next();
});

server.put('api/products/:id', (req, res, next) => {
    if (!req.params.id || !req.body || !req.body.name) {
        return next(new errors.BadRequestError());
    }
    try {
        const product = controller.update(+req.params.id, req.body.name);
        res.send(200, product);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.del('api/products/:id', (req, res, next) => {
    if (!req.params.id) {
        return next(new errors.BadRequestError());
    }
    try {
        controller.del(+req.params.id);
        res.send(204);
        return next();
    } catch (error) {
        return next(new errors.NotFoundError(error));
    }
});

server.listen(port, () => {
    console.info(`api is running on port ${port}`);
});
