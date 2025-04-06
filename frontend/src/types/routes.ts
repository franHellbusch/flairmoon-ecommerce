export enum PublicRoutes {
  LOGIN = "/login",
  HOME = "/",
  PRODUCTS = "/products",
  PRODUCT_DETAIL = "/product/:slug",
  CATEGORY_PRODUCTS = "/products/category/:categorySlug",
  CART = "/cart",
  BUYING_GUIDE = "/buying-guide",
  CONTACT = "/contact",
}

export enum PrivateRoutes {
  PRIVATE = "auth",
  CHECKOUT = "/auth/checkout",
  PROFILE = "/auth/profile",
}

export enum AdminRoutes {
  ADMIN = "/dashboard",
  ADMIN_PRODUCTS = "/dashboard/products",
  ADMIN_USERS = "/dashboard/users",
  ADMIN_COUPONS = "/dashboard/coupons",
  ADMIN_SETTINGS = "/dashboard/settings",
  ADMIN_REPORTS = "/dashboard/reports",
}
