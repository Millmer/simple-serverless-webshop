import NotFound from "@/views/404";

const staticRoutes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import(/* webpackChunkName: "cart" */ "@/views/Cart.vue")
  },
  {
    path: "/success",
    name: "PaymentSuccess",
    component: () =>
      import(/* webpackChunkName: "paymentResponse" */ "@/views/Success.vue")
  },
  {
    path: "/cancelled",
    name: "PaymentCancelled",
    component: () =>
      import(/* webpackChunkName: "paymentResponse" */ "@/views/Cancelled.vue")
  }
];

const dynamicRoutes = [
  {
    path: "/categories/:id",
    name: "Category",
    component: () =>
      import(/* webpackChunkName: "category" */ "@/views/Category.vue")
  },
  {
    path: "/products/:id",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "product" */ "@/views/Product.vue")
  }
];

const errorRoutes = [
  {
    path: "*",
    component: NotFound
  }
];

export { staticRoutes, dynamicRoutes, errorRoutes };
