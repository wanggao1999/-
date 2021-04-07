const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '增值税销项发票管理' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {  
  /*
  Vue-cli3:
  Crashed when using Webpack `import()` #2463
  https://github.com/vuejs/vue-cli/issues/2463
  */
  publicPath: process.env.NODE_ENV === 'production'
  ? './'
  : '/',

  publicPath: '/',
  lintOnSave: false, // 自动检测 false不开启
  productionSourceMap: false, // 设为false打包时不生成.map文件
  devServer: {
    // development server port 8000
    port: 8100,
    disableHostCheck: true,
    proxy: {
      '/': {
        target: 'https://book.youbaobao.xyz:18082',
        ws: false,
        changeOrigin: true,
        pathRewrite: { // 重定向
          '^/': '/'
        }
      }
    }
  },
    // autoOpenBrowser: false
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
  }
  
}
