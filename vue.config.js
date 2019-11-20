// //屏蔽 Vue CLI 3开发中的EsLint语法错误
module.exports = {
  lintOnSave: false
};

// // 屏蔽  no-console 报错
module.exports = {
  rules: {
      'no-console': 'off',
  },
}

module.exports = {
  rules: {
      'no-debugger': 'off',
  },
}



// const path = require('path');
// var env = process.env.NODE_ENV
// function resolve(dir) {
//     return path.join(__dirname, dir)
// }


// 上面代码貌似没用上，不过不碍事
module.exports = {
    //基本路径
    baseUrl: './', //加 ./ 解决404问题
    outputDir: 'dist',
    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: 'static',
    //以多页模式构建应用程序。
    pages: undefined,
    //是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    parallel: require('os').cpus().length > 1,
    // 是否在保存的时候使用 `eslint-loader` 进行检查。
    // 有效的值：`ture` | `false` | `"error"`
    // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
    // lintOnSave: false,
 
    // 是否为生产环境构建生成 source map？这样打包的dist文件体积会很小（正式版）
    //为true带测试环境，提交会大很多
    productionSourceMap: false,
  devServer: {
	// host: '192.168.5.208',
	// port: 8080,
	//publicPath: './',  //这里解决静态资源引用路径问题
    // 设置代理

  },
};


