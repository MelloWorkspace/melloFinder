// // src/app/router.tsx
// import {
// 	RouterProvider,
// 	createRootRoute,
// 	createRoute,
// 	createRouter,
// } from "@tanstack/react-router";

// import HomePage from "@/pages/home/ui/HomePage";
// import AboutPage from "@/pages/about/ui/AboutPage";

// const rootRoute = createRootRoute({ component: () => <Outlet /> });

// const homeRoute = createRoute({
// 	path: "/",
// 	getParentRoute: () => rootRoute,
// 	component: HomePage,
// });

// const aboutRoute = createRoute({
// 	path: "/about",
// 	getParentRoute: () => rootRoute,
// 	component: AboutPage,
// });

// const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);
// const router = createRouter({ routeTree });

// export { router };

// // src/app/providers/router-provider.tsx
// import { RouterProvider } from '@tanstack/react-router'
// import { router } from '@/app/router'

// export const RouterProviderApp = () => <RouterProvider router={router} />
