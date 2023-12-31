const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    '/api', //proxy가 필요한 path prameter를 입력
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};