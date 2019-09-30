import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home/Home.vue"
import Knowledge from "@/views/Knowledge/Knowledge.vue"
import Hot from "@/views/Hot/Hot.vue"
import Me from "@/views/Me/Me.vue"
import Login from "@/views/Login/Login.vue"
import KnowledgeArticle from "@/views/KnowledgeArticle/KnowledgeArticle.vue"
import Search from "@/views/Search/Search.vue"
import MyCollection from "@/views/MyCollection/MyCollection.vue"
import Test from "@/views/Test/Test.vue"

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      path: "/",
      name: 'home',
      component: Home,
    },
    {
      path: "/knowledge",
      name: 'knowledge',
      component: Knowledge
    },
    {
      path: "/hot",
      name: 'hot',
      component: Hot
    },
    {
      path: "/me",
      name: 'me',
      component: Me
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    },
    {
      path: "/knowledgeArticle",
      name: 'knowledgeArticle',
      component: KnowledgeArticle
    },
    {
      path: "/search",
      name: 'search',
      component: Search
    },
    {
      path: "/myCollection",
      name: 'myCollection',
      component: MyCollection
    },
    {
      path: "/test",
      component: Test
    }
  ]
})