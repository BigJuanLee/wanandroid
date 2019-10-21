wanandroid
==========

使用vue开发的一款玩安卓web app，样式是参考我朋友用安卓做的那款app(呃，其实就是仿制他的，不过他是用安卓写的，我用vue写的)。这是我作为一个初学者练手的项目吧，目前主要功能都仿制出来了，感觉大功告成先记录下来，写一点制作过程，和遇到的问题总结一下，剩余一些例如元素的出现动画啊，一些bug还没改，暂时先放放，以后再改。

    项目地址: https://github.com/BigJuanLee/wanandroid
    演示地址: 122.51.23.54

### 运行

    npm install
    
    npm run serve
    
    然后就可以在浏览器看到效果了，建议使用chrome的手机调试模式打开，因为做的是移动端的样式，直接在pc端显示会很怪。
    
### 技术栈

* vue-cli3创建项目结构，这个比较新而且有可视化界面，只要在控制到输入vue ui就会弹出一个网页，然后就可以根据需求一步步选择基本的配置。  

* vue+vue-router，比起vue全家桶单独少了一个vuex，因为我看介绍说如果您的应用够简单，您最好不要使用 Vuex，而我的确实很简单，所以就没用，第二就是没熟(不)练(会)，(我会看文档逐步尝试学习的)。  

* 插件，normalize.css，vue-axios。其他例如轮播图插件啊，滑动插件，postcss自适应插件，这些都没用。本着能手写就不用插件的精神，后面就后悔了，后面再说为什么。

### 制作过程
    
https://www.wanandroid.com/blog/show/2 这个是玩安卓开放的api，用于获取数据啊，做登录注册收藏各种功能。有了数据接口就可以同过axios.get(...).then(...).catch(...)这样拿到数据，然后在then里做想做的操作，最后catch里面返回一下错误，基本是这个套路。然而如果要在vue里用axios的话，除了install之外，还要在每个需要用的页面里import一下，很麻烦，所以这里用了vue-axios。安装完axios和vue-axios之后，在main.js里面import一下，接着Vue.use(VueAxios, axios)，就可以在每个页面this.axios.get(...)这样使用了，应该是方便了很多。
    
    
如果在每个页面获取数据的时候(随便选了一个接口)，直接this.axios.get(`https://www.wanandroid.com/article/list/0/json`)是不行的，会报一个跨域的错误，解决方法是在项目的根目录下新建一个vue.config.js的文件，然后里面配置一下
```module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'https://www.wanandroid.com/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
```
然后请求的时候就改成this.axios.get(`/api/...`)这样，在开发环境下应该是没问题了，注意只是在开发环境下，打包之后在生产环境依然会有问题，这下面再说。


首页的轮播图，首先通过axios获取了banner的数据后，用v-for生成若干个li，然后在data里写一个cuerrentIndex，用定时器每次把这个currentIndex加一，当然加到最后一张的时候要把这个currentIndex设置成第一张的下标，接着li里面用v-show，只有当v-for的index和这个currentIndex相等，才让这个li显示，这样大概就轮起来了。然而这样轮的话会一闪而过，毫无动画效果，这时用transtion-group包围这些li，然后写一点过渡效果就行了。这就做完一个简易的轮播图。翻开vue官网列表过渡那页有详细的解释, https://cn.vuejs.org/v2/guide/transitions.html#%E6%A6%82%E8%BF%B0 这个是地址。


首页下面的列表和其他很多页面都很类似。
```
https://www.wanandroid.com/article/list/0/json
方法：GET
参数：页码，拼接在连接中，从0开始。
```
他接口是这个样子的一开始this.axios.get(.../0/...)这样，然后v-for出来，没问题。后面做加载更多功能，就需要在data里设置一个pageNum，设置成1吧，然后写一个方法，里面的0就换成${this.pageNum}，每次滑到底部调用这个方法，就把pageNun加一就行了。怎样判断滑到底部，wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight这样，wrapper是你滑动的区域，我用$refs获取了这个区域，虽然vue不建议这样直接操作dom，但是暂时找不到其他方法。


在knowledge页面下有很多列表项，然后点击这些列表会进入新的页面，而这个新的页面的标题和导航是根据knowledge的列表项的数据而变化的。我最初想到的是路由传参，就是
```
this.$router.push({
        name: ...,
        params: ...
      });
```
name要对应params，path对应另外一个忘了。然后跳转的页面就用this.$route.params接收。这样导致的后果就是，如果这个新的页面刷新了，就会一点数据都没了。
解决方法，不用路由传参，用sessionStorage。在跳转的时候sessionStorage.setItem('...', JSON.stringify(...))，把数据放入本地储存，在新的页面JSON.parse(sessionStorage.getItem('...'))接收，这样就没问题了，因为那个...应该是一个对象，所以必须转化成字符串才能传过去，接收就用对应的方法把字符串转回对象就能使用了。


在刚才那个新页面下，有个导航栏，对应下面相应的列表。如果每次拉到最底下，那个pageNum就会加到很大，而切换导航的时候，再继续往下拉，因为pageNum已经变大了，所以可能会获取不到数据，这是需要每次切换的时候把pageNum初始化一下。


打包之后，我尝试放到github pages上面，然而他报了一个404错误，长时间百度过后，得出的结论是，在生产环境下axios.get(/api/...)里面的api不会帮我转化成https://www.wanandroid.com 所以找不到路径。所以我在main.js里设置了axios.defaults.baseURL，如果是开发环境呢，就等于/api，如果是生产环境呢，就等于https://www.wanandroid.com 然后各个页面的this.axios(/api/...)就把/api去掉，去掉的话，404的问题是解决了，然而在这个生产环境下还是会有跨域问题，很气！百度推荐过很多方法，有叫后端开个权限的，但是我并不认识这个后端，有叫用jsonp的，但是jsonp不支持post，而且我用get的时候也不行，不知道为什么。最后用了nginx，下载完nginx后，改一下conf里面的nginx.conf文件
```
location /api {
			proxy_pass  https://www.wanandroid.com/;
			proxy_set_header  X-Real_IP  $remote_addr;
		}
```
然后在main.js里面就不用分开发环境和生产环境了，直接把axios.defaults.baseURL设置成/api，然后开启一下nginx服务就成功解决这个跨域问题了！！大功告成，百度上很少有解决生产环境下的跨域问题，当初找了很久试了很多都不行，心灰意冷下找了一个前端大手子帮我解决了！！


### 最后

据我所知的问题啊，因为有些列表项点击会跳到外部的链接，在跳到外部链接后，再点击浏览器的返回键，底部的导航栏有时会对应不上相应的页面。收藏问题，这个心形按钮的颜色是根据后端的boolean值决定的，我点击后boolean值确实会改变，但不会实时更新，所以我每次点击强行刷新了一下页面，用户体验很差。登录的问题，没用路由守卫，还有判断是否在登录写得不严谨。好多好多问题，慢慢再修改吧，这个先当做是1.0版本。

