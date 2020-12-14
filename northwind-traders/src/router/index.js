import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Unauthorized from '@/views/Unauthorized.vue'
import Login from '@/views/Login.vue'
import { AuthService } from '../services/NorthwindService'

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: Unauthorized
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/suppliers",
        name: "suppliers",
        component: () =>
            import ("../views/Suppliers/SupplierList.vue"),

    },
    {
        path: "/suppliers/new",
        name: "suppliers-new",
        component: () =>
            import ("../views/Suppliers/SupplierEdit.vue")
    },
    {
        path: "/suppliers/:id",
        name: "suppliers-edit",
        component: () =>
            import ("../views/Suppliers/SupplierEdit.vue"),
        props: true
    },
    {
        path: "/categories",
        name: "categories",
        component: () =>
            import ("../views/Categories/CategoryList.vue")
    },
    {
        path: "/products",
        name: "products",
        component: () =>
            import ("../views/Products/ProductList.vue")
    },
    {
        path: "/products/new",
        name: "products-new",
        component: () =>
            import ("../views/Products/ProductEdit.vue")
    },
    {
        path: "/products/:id",
        name: "products-edit",
        component: () =>
            import ("../views/Products/ProductEdit.vue"),
        props: true
    },
    {
        path: "*",
        name: "not-found",
        component: () =>
            import ("../views/NotFound.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    let allowedRoutes = ['Home', 'Login', 'Unauthorized']
    if (allowedRoutes.indexOf(to.name) < 0 && !AuthService.isLoggedIn()) next({ name: 'Login' })
    else next()
})

export default router;