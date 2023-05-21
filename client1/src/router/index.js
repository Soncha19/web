import Vue from 'vue';
import Router from 'vue-router';
import Ping from '@/components/Ping';
import HelloWorld from "../components/Signin.vue";
import Home from "../components/Home.vue";
import Signin from "../components/Signin.vue";
import Profile from "../components/Profile.vue";
import FindUser from "../components/FindUser.vue";
import AddAdvert from "../components/AddAdvert.vue";
import Categories from "../components/Categories.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/sign-in',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/sign-up',
      name: 'Ping',
      component: Ping,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/find_user',
      name: 'FindUser',
      component: FindUser,
    },
    {
      path: '/new_add',
      name: 'AddAdvert',
      component: AddAdvert,
    },
    {
      path: '/category',
      name: 'Categories',
      component: Categories,
    },
  ],
});
