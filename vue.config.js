module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          resourceQuery: /blockType=docs/,
          use: [
            'html-loader',
            'markdown-loader',
          ],
        },
      ]
    }
  }
};
