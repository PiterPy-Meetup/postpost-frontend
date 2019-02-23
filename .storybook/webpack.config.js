const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html')

  defaultConfig.module.rules.push({
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
  })

  // If you use scss,
  //  defaultConfig.module.rules.push({ test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] })

  defaultConfig.module.rules.push({ test: /\.less$/, loaders: [ 'style-loader', 'css-loader', 'less-loader' ] })

  defaultConfig.plugins.push(new ForkTsCheckerWebpackPlugin())

  defaultConfig.module.rules.push({
    resourceQuery: /blockType=docs/,
    use: [
      'storybook-readme/env/vue/docs-loader',
      'html-loader',
      'markdown-loader',
    ],
  });

  return defaultConfig;
};