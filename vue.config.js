module.exports = {
    configureWebpack: {
      module: {
        rules: [
          {
            resourceQuery: /blockType=docs/,
            use: [
                'markdown-loader',
            ],
          }
        ]
      }
    }
  }