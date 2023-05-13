import VueRouter from "vue-router";
import Login from "@/components/Login";
import Home from "@/components/Home";
import Detail from "@/components/Detail";
const router = new VueRouter({
    routes:[
        {path:'/',component:Home},
        {path:'/login',component:Login},
        {path:'/home',component:Home},
        {path:'/detail',component:Detail}
    ]
})
// //路由守卫控制访问权限
// router.beforeEach((to,from,next) => {
//     if (to.path === '/login') return next();
//     const token = window.sessionStorage.getItem('token');
//     if (!token) return next('/login')
//     next();
// });
export default router;