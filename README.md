wanandroid
==========

  网页版玩安卓app，样式是参考我朋友用安卓做的那款app(呃，其实就是仿制他的，不过他是用安卓写的，我用vue写的)。这是我作为一个初学者练手的项目吧，目前主要功能都仿制出来了，感觉大功告成先记录下来，写一点制作过程，和遇到的问题总结一下。

    项目地址: https://github.com/BigJuanLee/wanandroid
    演示地址: 106.53.4.5 （三个月后过期，今天是2019.11.2）(续到了四月份)

### 查看效果	

   下载压缩包后，解压，把解压后的文件夹拖到vscode里，按ctrl+shift+tab上面那一点打开终端，然后依次输入

    npm install
    
    npm run serve
    
   最后会弹出一串localhost，按住ctrl再点击就可以在浏览器看到效果了。
    
   或者直接把上面的演示地址输入到浏览器里，因为做的是移动端样式，建议用开发者模式查看效果，也就是点一下f12，还有建议用谷歌浏览器。
    
### 技术栈

* vue-cli3创建项目结构，这个比较新而且有可视化界面，只要在控制到输入vue ui就会弹出一个网页，然后就可以根据需求一步步选择基本的配置。  

* vue+vue-router，比起vue全家桶单独少了一个vuex，因为似乎没必要。

  ~~* 插件，normalize.css，vue-axios。其他例如轮播图插件啊，滑动插件，postcss自适应插件，这些都没用。本着能手写就不用插件的精神，后面就后悔了。~~

* 插件，normalize.css，据说这个可以保证不同浏览器的一致性。vue-axios，axios不能直接使用Vue.use()，如果各个页面都要import就很麻烦，结合vue-axios使用。element-ui，使用了一下导航栏和轮播图的组件。

### 制作过程难点
    			
  ~~这个是玩安卓开放的api，用于获取数据啊，做登录注册收藏各种功能。有了接口之后，就可以使用axios发起请求啦。首先要安装axios，在项目的终端输入 npm install axios。然后哪个页面需要用到的话，就在那里import一下，就可以使用了，但是这样太麻烦，如果很多个页面用到就需要import很多次。所以用到了vue-axios,同样先安装一下,npm install --save vue-axios，然后在main.js里面import，最后Vue.use(VueAxios, axios)这样，每次需要使用，就可以直接this.axios...这样使用了，不用再import了，方便了一些。~~
  
    
  ~~在请求数据的时候，这里随便选了一个接口，直接this.axios.get(`https://www.wanandroid.com/article/list/0/json`)是不行的，会报一个跨域的错误。解决方法是在项目的根目录下新建一个vue.config.js的文件，然后里面配置一下，然后请求的时候就改成this.axios.get(`/api/...`)这样，在开发环境下应该是没问题了。而在生产环境依旧是存在跨域问题的。~~
  
  https://www.wanandroid.com/blog/show/2
  
  明确一下任务，要有一个数据接口，然后发起请求，拿到数据，放到网页上，然后排版。数据接口已经有了，是玩安卓开放的api。然后是发起请求，可以用原生ajax，new一个XMLHttpRequest对象，然后open()，send()，最后在onreadystatechange中处理返回的结果。也可以用axios，呃，不要问ajax和axios的区别是什么，我只知道也可以通过axios来发起请求。 https://segmentfault.com/a/1190000013128858 这里有使用的例子。
  
  上面的例子是this.axios.get('api/getNewsList')这样写的，那个api直接写成 https://www.wanandroid.com 会报跨域的错误，百度一搜一大堆啊，大概就是说新建一个vue.config.js，然后把下面那段代码复制进去就可以了。拿到数据用css慢慢调整排版就可以了。
  
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

  据说会写轮播图的不一定是好前端，但是不会写轮播图的一定不是好前端，所以在首页手写了一个简易（陋）的轮播图，思路是用v-show搭配定时器，然后切换的时候用一点过渡动画。
  首先通过axios获取的图片的数据，保存在data里面的一个数组里，通过v-for循环创建出相应的图片，然后在data里设置一个索引，用定时器逐次加一，再把v-show的条件设为data里的索引和v-for的索引相等，这样轮播图就轮起来了。但是这样每次轮的时候会一闪而过，这时添加点过渡动画就可以了。
  
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

  尝试用一下element-ui。看了一下文档，首先要安装，npm i element-ui -S，安装完了看快速上手，那里写了有全部引入和按需引入，按需引入体积会小一点，加上只要用到轮播图和导航栏就行了，就看按需引入。他说要安装 babel-plugin-component，然后修改.babelrc，我用vue-cli3.0创建出来的目录是没有.babelrc的，经过一番百度，https://blog.csdn.net/hahahhahahahha123456/article/details/102816457 ，找到了解决方案。他说.babelrc的配置也可以放在babel.config.js，刚好我就有这个文件，然后把文档那些修改复制进去会报一个错，里面也有解决方法。
  
  然后不报错了，就在main.js引入需要用到的组件，然后Vue.use()，就可以使用了。导航栏我自己写的时候是默认第一个高亮，如果我点击了其他几个，然后刷新了浏览器，就会出现导航栏高亮的部分和实际所在的页面对应不上的bug。用element-ui的Tabs，v-model双向绑定一个activeName，再把activeName设置成this.$route.name就不会有这个问题了。
  
  嗯，因为还会有跳到外部链接，然后点击返回好像也会出现对应不上的bug，暂时没想到怎么解决。
  

```
https://www.wanandroid.com/article/list/0/json
方法：GET
参数：页码，拼接在连接中，从0开始。
```

  接口是这个样子的，每次拉到最底下，再请求这个接口，然后把页码的参数加一，就可以做成上滑加载更多的功能了。判断一个滑动区域拉到最底的条件是 wrapper.scrollHeight - wrapper.scrollTop === wrapper.clientHeight，这个wrapper要有一个高度，而且overflow要设置成scroll，然后wrapper的内容超出wrapper的时候，就可以开始滑动了。
  
  加载更多element-ui也有，叫做无限滚动，感觉自己写的已经够用了就没用。

```
getLatestList() {
      this.axios
        .get("/article/list/0/json")
        .then(res => {
          this.lastestList = res.data.data.datas;
        })
        .catch(error => error);
},
    
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

  点击知识体系页面下面每一个列表，是要跳转到新的一个页面，这里叫做文章页。这个文章页的顶部的标题，和导航都是根据知识体系页的内容来显示的。所以一开始最先想到的是用路由传参，但是用路由传参的话，文章页一刷新就什么数据都没有了。所以改用了本地储存sessionStorage，注意点是，sessionStorage.setItem只能存字符串格式，但是这里需要传过去的是一个对象，所以传的时候要把对象转为字符串，接受的时候再转回对象使用。还有一点就是，文章页有个上滑加载功能，还有切换功能，切换的时候要把页码的参数初始化一下，不然切换到第二页因为页码不是从0开始，就算再怎么下拉有时会加载不出来数据。

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



### 生产环境下的跨域问题

  当项目做的差不多，打包好想然后给别人演示。一开始我是想丢到github page上面，结果发现报了一个404的错误。经过多方查证和百度过后，得出的结论是，在生产环境下，axios请求的时候没有帮我把/api/转化成我在vue.config.js设置的那样。所以一开始想到的是，手动设置开发环境和生产环境下的请求路径，在main.js里面设置axios.defaults.baseURL，如果是开发环境，就等于/api/，如果是生产环境，就等于 https://www.wanandroid.com/ ，然后各个页面下的axios请求就把/api/去掉。这样是成功解决了404的问题，但是随之而来又报了跨域的错，很气！！！
  
  然后再次经过多方查证和百度过后，发现是生产环境下的跨域问题，而百度上解决这个问题的方案很多，我尝试过最后成功的就只有一个，就是使用nginx。要去nginx官网下载一个最新版本，然后修改一下conf文件夹里面的nginx.conf配置，接着把打包好的dist文件夹丢到nginx文件夹根目录下，开启服务，大功告成！！！
  
  
```
location /api {
	proxy_pass  https://www.wanandroid.com/;
	proxy_set_header  X-Real_IP  $remote_addr;
}
```

### 手机上滑动的问题

  在电脑上用浏览器开发者模式预览是没什么问题的，但是用手机浏览器打开的话，发现滑动功能都失效了。对比了pc端和移动端的区别，发现在移动端下，浏览器多了自带的底部工具栏和顶部的地址栏，感觉是这两个地方导致我下拉条判断出错了。https://blog.csdn.net/weixin_36076584/article/details/79620534 ，应该是遇到和这篇文章相同的问题，里面也有解决方法。我在打包后的dist文件夹下面的index.html添了两行代码就行了。
  
```
<meta name=”apple-mobile-web-app-capable” content=”yes” />
<meta name="full-screen" content="yes">
```

### 登录问题

  ~~vue版本，使用axios请求登录接口后，返回的数据是{data:{...}, errorCode: 0, errorMsg: ''},小程序版本还多了一个cookies和header，而这个header里面有个set-header，要把这个字段放在请求头里才能验证登录与否。浏览器没有返回header，所以会出现一点问题，什么时候过期了也不清楚。~~
  
  浏览器请求登录接口后，会得到一串cookie，包含这用户名和密码"Hm_lvt_90501e13a75bb5eb3d067166e8d2cad8=1570047747; loginUserName=921456177; token_pass=37831f0dbc75ec9c302f14a423dd1edc"大概长这个样，所以判断这个字符串里面有没有loginUserName就可以判断是否登录了。获取cookie的方法是document.cookie,判断字符串是否含有子串是.includes()。
  
### 点击收藏按钮问题

  文章列表是一个子组件，它的收藏状态是由父组件传进来的，用props接收。收藏按钮判断是否高亮度时候，v-if不能直接使用props的状态，要先在data声明一个变量，赋值给它，然后根据这个变量判断，不然不会实时更新。



### 目前已知的问题

  ~~点击跳转到外部链接后，点击浏览器的返回键，底部的tab栏有时会对应不上。~~
  
  (小程序版没有这种问题)
  

  ~~跳转到外部链接后，返回功能没做。~~
  
  (小程序版用webview完美实现)
  

  ~~点击收藏按钮的时候，页面必须刷新一下才能看见心形图标变蓝，用户体验不好。~~
  
  ~~(小程序版本使用setdata完美局部刷新，vue版局部刷新，经过百度就是用this.reload()的)~~
  

  ~~axios请求大概的逻辑差不多，应该封装一下。~~
  
  (小程序版本稍微封装了一下)
  

  ~~判断登录不严谨。~~
   

  ~~没用路由守卫，需要先登录才能进入的页面部分的代码可以优化。~~
   

  ~~用手机体验首页存在加载不了更多的bug。~~
  

  ~~用手机需要输入的时候，输入法会把页面挤变形。~~
  
  （换一种简约的方式，就放两个input一个button，在小程序版实现了）


  ~~退出登录功能没做。~~
  
  
  ~~轮播图太简易了。~~
  

  ~~元素的出现动画没做，一些点击动画也没做。（以上两个准备使用element-ui解决）

   (已经用了element-ui了)

### 最后

~~哇，总结了好多问题和bug，或许还有我不知道的。之前还做了一款知乎日报，用了better-scroll，丝般顺滑，无论在pc端还是移动端都毫无问题，这次尝试不用插件在移动端就出现了预期之外的问题，而且没什么头绪。还有轮播图也太简单了，明明有很多插件可以用的，都没用。我想如果在工作之中的话，还是要以完成任务为先，能用插件就用插件了，自己写的话，一是没别人好，二是写得慢，只有在平时自己做着玩的时候才手写吧。~~

有一次面试，别人问你用过ui框架吗？咦，这和我平时听见的有所不同啊，我听大神都是说什么都要手写，怎么面试还问会不会用框架呢？既然这样的话，那还是稍微学着用一下吧。
