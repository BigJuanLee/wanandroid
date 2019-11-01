wanandroid
==========

使用vue开发的一款玩安卓web app，样式是参考我朋友用安卓做的那款app(呃，其实就是仿制他的，不过他是用安卓写的，我用vue写的)。这是我作为一个初学者练手的项目吧，目前主要功能都仿制出来了，感觉大功告成先记录下来，写一点制作过程，和遇到的问题总结一下。

    项目地址: https://github.com/BigJuanLee/wanandroid
    演示地址: 122.51.23.54（快过期了），106.53.4.5（这个还有三个月，今天是2019.11.2）

### 运行

    npm install
    
    npm run serve
    
    然后就可以在浏览器看到效果了，建议使用chrome的手机调试模式打开，因为做的是移动端的样式，直接在pc端显示会很怪。
    
### 技术栈

* vue-cli3创建项目结构，这个比较新而且有可视化界面，只要在控制到输入vue ui就会弹出一个网页，然后就可以根据需求一步步选择基本的配置。  

* vue+vue-router，比起vue全家桶单独少了一个vuex，因为我看介绍说如果您的应用够简单，您最好不要使用 Vuex，而我的确实很简单，所以就没用，第二就是没熟(不)练(会)，(我会看文档逐步尝试学习的)。  

* 插件，normalize.css，vue-axios。其他例如轮播图插件啊，滑动插件，postcss自适应插件，这些都没用。本着能手写就不用插件的精神，后面就后悔了。

### 制作过程
    
https://www.wanandroid.com/blog/show/2 这个是玩安卓开放的api，用于获取数据啊，做登录注册收藏各种功能。有了数据接口就可以通过axios.get(...).then(...).catch(...)这样拿到数据，然后在then里做想做的操作，最后catch里面返回一下错误，基本是这个套路。然而如果要在vue里用axios的话，除了install之外，还要在每个需要用的页面里import一下，很麻烦，所以这里用了vue-axios。安装完axios和vue-axios之后，在main.js里面import一下，接着Vue.use(VueAxios, axios)，就可以在每个页面this.axios.get(...)这样使用了，应该是方便了很多。
    
    
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


### 首页
![image](https://github.com/BigJuanLee/wanandroid/blob/master/screenshot/home.png)

首页的轮播图，首先通过axios获取了banner的数据后，用v-for生成若干个li，然后在data里设置一个cuerrentIndex=0用于记录当前图片的索引，用定时器把这个索引逐次加一，加到li的长度减一，也就是最后一张图片的索引的时候，设置成0。接着li里面设置v-show="index == currentIndex"，只有当v-for的index和这个currentIndex相等，才让这个li显示，这样大概就轮起来了。然而这样轮的话，图片会一闪而过，毫无动画效果。这时用transtion-group包住li，设置transtion-group的name为...，以便后面用于写过渡效果，设置tag为ul，这样transtion-group就会渲染成ul。然后添上过渡效果就行了。
```
.list-enter-active {
    transform: translateX(0);
    transition: all 1s ease-in-out;
  }
  .list-leave-active {
    transform: translateX(-100%);
    transition: all 1s ease-in-out;
  }
  .list-enter {
    transform: translateX(100%);
  }
  .list-leave {
    transform: translateX(0);
  }
```
这就做完一个简易的轮播图。 https://cn.vuejs.org/v2/guide/transitions.html#%E6%A6%82%E8%BF%B0 这个是vue过渡动画详细用法的介绍。


首页下面的列表和其他很多页面都很类似。
```
https://www.wanandroid.com/article/list/0/json
方法：GET
参数：页码，拼接在连接中，从0开始。
```
他接口是这个样子的。只需要写好其中一个列表项的样式，用this.axios.get(.../0/...)这样拿到数据后保存在data里面，就用v-for循环创建出来，没问题。后面做加载更多功能，就需要在data里设置一个pageNum，设置成1吧，然后写一个方法，里面的0就换成${this.pageNum}，每次滑到底部调用这个方法，就把pageNun加一就行了。怎样判断滑到底部，wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight这样，wrapper是你滑动的区域，我用$refs获取了这个区域，虽然vue不建议这样直接操作dom，但是暂时找不到其他方法。

```
getLatestList() {
      this.axios
        .get("/article/list/0/json")
        .then(res => {
          this.lastestList = res.data.data.datas;
        })
        .catch(error => error);
    },
    getBeforeList() {
      this.axios
        .get(`/article/list/${this.listNum}/json`)
        .then(res => {
          this.beforeList.push(...res.data.data.datas);
        })
        .catch(error => error);
      this.listNum++;
    }
    
    handleScroll() {
      let wrapper = this.$refs.wrapper;
      if (wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight) {
        this.getBeforeList();
      }
    }

```


### 知识体系页面和文章页
![image](https://github.com/BigJuanLee/wanandroid/blob/master/screenshot/knowledge.png)
![image](https://github.com/BigJuanLee/wanandroid/blob/master/screenshot/k-article.png)

点击知识体系页面下面每一个列表，是要跳转到新的一个页面，这里暂时叫做文章页。这个文章页的顶部的标题，和导航都是根据知识体系页的内容来显示的。所以一开始最先想到的是用路由传参，就像下面这样。
```
this.$router.push({
        name: ...,
        params: ...
      });
```
跳转的页面就用this.$route.params接收，这样导致的后果就是，如果这个文章页刷新了，就会一点数据都没了。
解决方法，不用路由传参，用sessionStorage。在跳转的时候sessionStorage.setItem('...', JSON.stringify(...))，把数据放入本地储存，在文章页用JSON.parse(sessionStorage.getItem('...'))接收，这样就没问题了，因为那个...应该是一个对象，所以必须转化成字符串才能传过去，接收就用对应的方法把字符串转回对象就能使用了。
文章页有个小问题就是，每次拉到最底下，pageNum都会变大，而切换的时候，需要把pageNum初始化一下，不然继续下拉就获取不到数据了。


### 生产环境下的问题

打包之后，我尝试放到github pages上面，然而他报了一个404错误，长时间百度过后，得出的结论是，在生产环境下axios.get(/api/...)里面的api不会帮我转化成https://www.wanandroid.com 所以找不到路径。所以我在main.js里设置了axios.defaults.baseURL。如果是开发环境呢，就等于/api，如果是生产环境呢，就等于https://www.wanandroid.com 然后各个页面的this.axios(/api/...)就把/api去掉。去掉的话，404的问题是解决了，然而在这个生产环境下还是会有跨域问题，很气！百度推荐过很多方法，有叫后端开个权限的，但是我并不认识这个后端，有叫用jsonp的，但是jsonp不支持post，而且我用get的时候也不行，不知道为什么，还有叫装一款插件的，忘了叫什么了，试过都不行。最后用了nginx(其实nginx一开始也不行，我开启不了服务，无论是双击exe还是通过命令行的方式都不行，一个大手子把他的nginx压缩包给我就行了)。下载完nginx后，改一下conf里面的nginx.conf文件
```
location /api {
			proxy_pass  https://www.wanandroid.com/;
			proxy_set_header  X-Real_IP  $remote_addr;
		}
```
然后在main.js里面就不用分开发环境和生产环境了，直接把axios.defaults.baseURL设置成/api，然后开启一下nginx服务，把打包好的dist文件夹丢到nginx的根目录下就成功解决这个跨域问题了，如果是在本地想尝试一下效果，就打开localhost:80，如果像我这样放到服务器上，就需要买一个服务器，然后把配置好的nginx文件夹整个上传到服务器，接着打开服务器的公网ip就可以看到效果了。大功告成！！！


### 目前已知的问题

* 点击跳转到外部链接后，点击浏览器的返回键，底部的tab栏有时会对应不上。

* 点击收藏按钮的时候，页面必须刷新一下才能看见心形图标变蓝，用户体验不好。

* axios请求大概的逻辑差不多，应该封装一下。

* 判断登录好像有点不严谨。

* 没用路由守卫，需要先登录才能进入的页面部分的代码可以优化。

* 用手机体验首页存在加载不了更多的bug。

* 用手机需要输入的时候，输入法会把页面挤变形。

* 轮播图太简易了。

* 退出登录功能没做。

* 元素的出现动画没做，一些点击动画也没做

### 最后
哇，总结了好多问题和bug，或许还有我不知道的。之前还做了一款知乎日报，用了better-scroll，丝般顺滑，无论在pc端还是移动端都毫无问题，这次尝试不用插件在移动端就出现了预期之外的问题，而且没什么头绪。还有轮播图也太简单了，明明有很多插件可以用的，都没用。我想如果在工作之中的话，还是要以完成任务为先，能用插件就用插件了，自己写的话，一是没别人好，二是写得慢，只有在平时自己做着玩的时候才手写吧。
