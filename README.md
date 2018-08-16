# music

> 音乐播放器

## 目录结构
.
- build                 # 打包配置
- config                # 项目配置
- node_modules      
- src         
  - api                 # api  
    - config.js         # HTTP request common config
  - assets              # 静态资源 
    - css               # stylus模块
      - reset.styl      # 全局重置样式
      - base.styl       # 全局通用样式
      - index.styl      # 导入样式
      - mixin.styl      # 样式函数mixin
      - variable.styl   # 样式规范
      - icon.styl       # icon样式
    - fonts
    - images 
  - common              # 通用函数(# more than 1 module, used)
  - base                # 基础组件(# more than 1 component, used; Ex: components/, pages/, put in node_modules/antd/)
  - components          # 组件(# components with business rules & objects)
  - router              
    - index.js          # 定义路由对象
  - store         
    - modules           # 
    - actions           # 
    - mutations         #
    - index.js          # 定义应用store
  - App.vue             # 应用/根组件
  - main.js             # 初始化 & 渲染组件树
- static
- test 
  - unit                # 单元测试
    - specs             # 测试规范文件
    - jest.conf.js      # 使用jest单元测试的配置
    - setup.js          # jest运行之前的测试环境设置

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
