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
      'storybook-readme/env/vue/docs-loader',
      'html-loader',
      'markdown-loader',
    ],
  });

  return config;
};
