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
    
  https://www.wanandroid.com/blog/show/2 
	
		
  这个是玩安卓开放的api，用于获取数据啊，做登录注册收藏各种功能。有了接口之后，就可以使用axios发起请求啦。首先要安装axios，在项目的终端输入 npm install axios。然后哪个页面需要用到的话，就在那里import一下，就可以使用了，但是这样太麻烦，如果很多个页面用到就需要import很多次。所以用到了vue-axios,同样先安装一下,npm install --save vue-axios，然后在main.js里面import，最后Vue.use(VueAxios, axios)这样，每次需要使用，就可以直接this.axios...这样使用了，不用再import了，方便了一些。
    
  在请求数据的时候，这里随便选了一个接口，直接this.axios.get(`https://www.wanandroid.com/article/list/0/json`)是不行的，会报一个跨域的错误。解决方法是在项目的根目录下新建一个vue.config.js的文件，然后里面配置一下，然后请求的时候就改成this.axios.get(`/api/...`)这样，在开发环境下应该是没问题了。而在生产环境依旧是存在跨域问题的，也就是打包之后。
  
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



### 首页
![image](https://github.com/BigJuanLee/wanandroid/blob/master/screenshot/home.png)

  首页有个手写的简易（陋）的轮播图，思路是用v-show搭配定时器，然后切换的时候用一点过渡动画。首先通过axios获取的图片的数据，保存在data里面的一个数组里，通过v-for循环创建出相应的图片，然后在data里设置一个索引，用定时器逐次加一，再把v-show的条件设为data里的索引和v-for的索引相等，这样轮播图就轮起来了。但是这样每次轮的时候会一闪而过，这时添加点过渡动画就可以了。
  
```
<transition-group name="list" tag="ul" class="container">
      <li v-for="(item, index) in banner" :key="'li' + index" v-show="index == currentIndex">
        <img :src="item.imagePath" alt />
        <div class="desc">{{item.title}}</div>
      </li>
</transition-group>

```

```

move() {
      setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > this.length - 1) {
          this.currentIndex = 0;
        }
      }, 2000);
    }

```

  
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



  首页下面的列表和其他几个页面的列表很相似，所以只要写好其中一个列表项的样式抽成组件，在需要用到的地方使用v-for就组成了列表，然后传递不同的数据就可以了。

```
https://www.wanandroid.com/article/list/0/json
方法：GET
参数：页码，拼接在连接中，从0开始。
```

  接口是这个样子的，每次拉到最底下，再请求这个接口，然后把页码的参数加一，就可以做成上滑加载更多的功能了。判断一个滑动区域拉到最底的条件是 wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight，这个wrapper要有一个高度，而且overflow要设置成scroll，然后wrapper的内容超出wrapper的时候，就可以开始滑动了。

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

  点击知识体系页面下面每一个列表，是要跳转到新的一个页面，这里叫做文章页。这个文章页的顶部的标题，和导航都是根据知识体系页的内容来显示的。所以一开始最先想到的是用路由传参，但是用路由传参的话，文章页一刷新就什么数据都没有了。所以改用了本地储存sessionStorage，注意点是，sessionStorage.setItem只能存字符串格式，但是这里需要穿过去的是一个对象，所以传的时候要把对象转为字符串，接受的时候再转回对象使用。还有一点就是，文章页有个上滑加载功能，还有切换功能，切换的时候要把页码的参数初始化一下，不然切换到第二页因为页码不是从0开始，就算再怎么下拉有时会加载不出来数据。

```
toKnowledgeArtcile(list) {
      sessionStorage.setItem('list', JSON.stringify(list));
      this.$router.push({
        name: "knowledgeArticle",
        // params: list
      });
}
```

```
setParams() {
      // this.list = this.$route.params; 这种方式刷新页面会导致获取不到list，因此把list放在缓存里
      this.list = JSON.parse(sessionStorage.getItem('list'));//储存对象时要把对象转为字符串，获取再转回json
},
```

```
clear() {
      this.beforeArticle.length = 0;
      this.pageNum = 1;
}
```

制作的难点好像就这些，主要还是跨域的问题。


### 生产环境下的跨域问题

  当项目做的差不多，打包好想然后给别人演示。一开始我是想丢到github page上面，结果发现报了一个404的错误。经过多方查证和百度过后，得出的结论是，在生产环境下，axios请求的时候没有帮我把/api/转化成我在vue.config.js设置的那样。所以一开始想到的是，手动设置开发环境和生产环境下的请求路径，在main.js里面设置axios.defaults.baseURL，如果是开发环境，就等于/api/，如果是生产环境，就等于 https://www.wanandroid.com/ ，然后各个页面下的axios请求就把/api/去掉。这样是成功解决了404的问题，但是随之而来又报了跨域的错，很气！！！
  
  然后再次经过多方查证和百度过后，发现是生产环境下的跨域问题，而百度上解决这个问题的方案很多，我尝试过最后成功的就只有一个，就是使用nginx。要去nginx官网下载一个最新版本，然后修改一下conf文件夹里面的nginx.conf配置，接着把打包好的dist文件夹丢到nginx文件夹根目录下，开启服务，大功告成！！！
  
  小插曲，其实一开始用nginx，死活开启不了服务，无论通过命令行还是双击exe都不行，任务管理器依旧没这个进程。后来找到一个大手子，他发了他的nginx压缩包给我就能开启服务了，很奇怪。然后解决了这个跨域问题的目的是想演示，我就买了个服务器，然后把整个配置好的nginx文件夹，包括已经把dist包也放进去这样，整个复制到了服务器上，然后输入公网ip就能演示了，建议用谷歌浏览器打开然后按一下f12。至于为什么一开始是说要用github page，后面又突然使用了服务器，因为大手子说服务器好啊，直接丢到服务器上就能演示了，就听了他的话......毕竟这个生产环境下的跨域问题不是我自己解决的，我尝试了百度上很多办法，例如jsonp，或者下载些什么插件统统不行，万念俱灰就快放弃的时候大手子拯救了我，所以我很相信他的话。就是这样
  
```
location /api {
	proxy_pass  https://www.wanandroid.com/;
	proxy_set_header  X-Real_IP  $remote_addr;
}
```



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
