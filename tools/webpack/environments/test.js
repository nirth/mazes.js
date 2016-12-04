import webpack from 'webpack';

export const testEnv = () => {
  return {
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(0),
        __ENVIRONMENT__: JSON.stringify('test'),
      }),
    ],
    module: {
      preLoaders: [{
        test: /\.js$/,
        loaders: [
          'babel',
          'eslint-loader',
        ],
        exclude: /node_modules/,
      }],
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /(node_modules|dist)/,
        },
        {
          test: /\.json$/,
          loader: 'json',
        },
      ],
      postLoaders: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules|dist)/,
          loader: 'istanbul-instrumenter',
        },
      ],
    },
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
  }
};
