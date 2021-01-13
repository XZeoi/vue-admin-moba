module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'common': 'components/common',
        'content': 'components/content',
        'plugins': '@/plugins',
        'views': '@/views',
        'network': '@/network'
      }
    }
  }
}