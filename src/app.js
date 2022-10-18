const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routesAdmin = require('./routes/admin');
const routesClient = require('./routes/client');
let redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const routesApi = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

app.use(cookieParser());

if (config.env !== 'test') {
  // app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set view engine
app.set('view engine', 'ejs');
app.set('views', ['src/views/admin/pages', 'src/views/client/pages']);
app.use('/', express.static(path.join(__dirname, '/views/client')));
app.use('/admin', express.static(path.join(__dirname, '/views/admin')));

// set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

// parse json request body
app.use(express.json());

// parse files
app.use(fileUpload({ useTempFiles: true }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// Don't redirect if the hostname is `localhost:port`
app.use(redirectToHTTPS([/localhost:(\d{4})/], undefined, 301));

// admin routes
app.use('/admin', routesAdmin);

// client routes
app.use('/', routesClient);

// v1 api routes
app.use('/v1', routesApi);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
