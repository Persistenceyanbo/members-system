// const { VUE_APP_SERVICE_URL } = process.env;

module.exports = {
  devServer: {
    port: 8888, // 端口号
    host: '127.0.0.1', // 主机名127.0.0.1 真机0.0.0.0
    https: false, // 协议
    open: false, // 启动服务时自动打开浏览器访问
    proxy: { // 开发环境设置代理
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL, // 目标服务器地址，代理访问http://localhost:9002
        changeOrigin: true, //开启代理服务器
        pathRewrite: {
          // '^/dev-api': '' // 将请求地址前缀/dev-api替换为空的
          ['^' + process.env.VUE_APP_BASE_API]: '' // 动态的获取前缀
        }
      }
    }
  },
  lintOnSave: false, // 关闭格式检查
  productionSourceMap: false // 打包时不会生成.map文件， 加快打包的速度
}
