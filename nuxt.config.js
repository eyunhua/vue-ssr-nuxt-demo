const path = require('path')
export default {
  // 允许你在`Javascript`和`Css`中使用别名访问自定义目录
  alias: {
    '~~': `<rootDir>`,
    '@@': `<rootDir>`,
    '~': `<srcDir>`,
    '@': `<srcDir>`,
    'assets': `<srcDir>/assets`, // (unless you have set a custom `dir.assets`)
    'static': `<srcDir>/static`, // (unless you have set a custom `dir.static`)
    'style': path.resolve(__dirname, './assets/style')
  },

  // 定义应用程序的工作区目录，默认值process.cwd()
  rootDir: '',

  // 定义应用程序的source目录，默认值同rootDir
  srcDir: '',

  // server连接配置
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },

  // npm run generate时执行，构建部署静态应用程序
  generate: {
    // 目录名
    dir: 'dist'
  },

  // true启动服务器端渲染，false只启动客户端渲染
  ssr: true,

  // headers设置，Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ssr-demo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // 全局css，Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'ant-design-vue/dist/antd.css'
    // css后缀可以省略
    'assets/style/common'
  ],

  // 添加plugins目录下的js文件到应用程序中，Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/veui'
  ],

  // 自动扫描和导入组件，无需在使用时import组件，可直接使用，Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // 是否提取css至独立文件中
    extractCSS: true,
    // babel相关配置
    babel: {
      plugins: [
        'veui',
        ['import', {
          'libraryName': 'ant-design-vue',
          'libraryDirectory': 'es',
          'style': true
            // customStyleName: name => {
            //   return `assets/${name}.css`
            // }
          }
        ] // `style: true` 会加载 less 文件
      ]
    },
    // 可省略的扩展名
    resolve: {
      extensions: ['.js', '.vue', '.json']
    },
    // 需要进行babel编译的包
    transpile: ['veui', 'vue-awesome', 'ant-design-vue'],
    // loader配置
    loaders: {
      vue: {
        extractCSS: true
      },
      less: {
        javascriptEnabled: true
      }
    },
    // 手动扩展客户端和服务端的webpack配置
    extend(config, context){
        //添加loader规则
          config.module.rules.push({
              test: /\.vue$/, //匹配.svg
              include: [path.resolve(__dirname, 'node_modules/veui')], //将存放svg的目录加入到loader处理目录
              use: [{ loader: 'veui-loader', options: {
                modules: [
                  {
                    package: 'veui-theme-blue',
                    fileName: '${module}.less'
                  },
                  {
                    package: 'veui-theme-blue',
                    fileName: '${module}.js',
                    transform: false
                  }
                ]
              }}]
          })
    }
  }
}
