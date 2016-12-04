import path from 'path';
import express from 'express';
import webpack from 'webpack';
import {devEnv} from '../webpack/environments';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {Deferred} from 'sancus';
import debug from 'debug';

const app = express();
const log = debug('server');

/**
 * Resolves environment factory by name.
 * 
 * @function resolveEnvironment
 * @private
 */
const resolveEnvironment = (name) => {
  // Lowercase the name.
  const n = name.toLowerCase();

  if (n === 'dev' || n === 'development') {
    return devEnv;
  }

  throw new Error(`Unexpected environment ${name} was provided to server, please check available environments`);
};

/** 
 * Starts development server, use `options` to configure it.
 *
 * @function startServer
 * @param {Object} options - Server configuration.
 * @param {string} target - Name of a target file or directory that server should be serving.
 * @param {string} environment - Environment's name.
 * @param {string} host - Hostname.
 * @param {string | number} - port - Port number, can be either string or number.
 * @returns {Promise} - Promise that will be resolved when server starts or fails to do so.
 */
export const startServer = ({target, environment = 'development', host, port}) => {
  const d = new Deferred;
  const config = resolveEnvironment(environment)({target});
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    options: {
      noInfo: true,
      publicPath: config.output.publicPath,
      hot: true,
      historyApiFallback: true,
    },
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../src/index.html'));
  });

  // Place for dummy API.
  // app.get(/^\/api\/search\/([a-zA-Z0-9\ \-]+)/, );

  app.get(/^([a-zA-Z0-9\/\-\+]+)$/, (req, res) => {
    res.sendFile(path.join(__dirname, '../../src/index.html'));
  });

  const server = app.listen(port, host, (err) => {
    if (err) {
      log(err);
      d.reject(err);
      return;
    }

    console.info(`Listening at http://${host}:${port}`);

    d.resolve(server);
  });

  return d.promise;
};
