// import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
// import path from "node:path";
// import { normalizePath } from "vite";
// import { viteStaticCopy } from "vite-plugin-static-copy";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		svgr({ include: '**/*.svg' })
		// TanStackRouterVite(),
		// viteStaticCopy({
		// 	targets: [
		// 		{
		// 			src: normalizePath(path.resolve("./src/assets/locales")),
		// 			dest: normalizePath(path.resolve("./dist")),
		// 		},
		// 	],
		// }),
	],
	server: {
		host: true,
		strictPort: true,
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		css: true,
	},
});
