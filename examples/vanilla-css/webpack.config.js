const {
  decorateConfig
} = require('@pluralsight/ps-design-system-build/webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackTemplate = require('html-webpack-template')
const path = require('path')

module.exports = decorateConfig(
  {
    entry: './src/index.js',
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: htmlWebpackTemplate,
        appMountId: 'app',
        // NOTE: get your non-component css some old-fashioned way
        links: [
          'https://cloud.typography.com/6966154/691568/css/fonts.css',
          'node_modules/@pluralsight/ps-design-system-normalize/dist/index.css',
          'node_modules/@pluralsight/ps-design-system-core/dist/index.css',
          'src/app.css'
        ]
      })
    ]
  },
  {
    extraInclude: [path.resolve('src')],
    packageJson: require('./package.json')
  }
)
