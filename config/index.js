'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
let baseUrl = 'http://49.4.54.245:8080'
let wsUrl = 'ws://49.4.54.245:8080'

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/socket/**': {
        target: wsUrl,
        ws: true,
        secure: false,
        logLevel: 'debug',
      },
      '/oauth': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/oauth': '/oauth'
        }
      },
      '/sys': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/sys': '/sys'
        }
      },
      '/ms': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/ms': '/ms'
        }
      },
      '/poserver.zz': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/poserver.zz': '/poserver.zz'
        }
      },
      '/posetup.exe': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/posetup.exe': '/posetup.exe'
        }
      },
      '/pageoffice.js': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/pageoffice.js': '/pageoffice.js'
        }
      },
      '/jquery.min.js': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/jquery.min.js': '/jquery.min.js'
        }
      },
      '/pobstyle.css': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/pobstyle.css': '/pobstyle.css'
        }
      },
      '/sealsetup.exe': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/sealsetup.exe': '/sealsetup.exe'
        }
      },
      '/assets': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/assets': '/assets'
        }
      }
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
