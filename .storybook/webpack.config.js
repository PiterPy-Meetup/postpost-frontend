const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = ({ config, mode }) => {
  // typescript support
  config.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html');

  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }
    ],
  });
  config.plugins.push(new ForkTsCheckerWebpackPlugin());

  // <docs> tag support
  config.module.rules.push({
    resourceQuery: /blockType=docs/,
    use: [
      require.resolve('./docs-loader.js'),
      'html-loader',
      'markdown-loader',
    ],
  });
  // support for info addon https://github.com/pocka/storybook-addon-vue-info
  config.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    enforce: 'post'
  });

  return config;
};
