import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@common": path.resolve(__dirname, "src/common"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@layout": path.resolve(__dirname, "src/layout"),
			"@types": path.resolve(__dirname, "src/types"),
			"@utils": path.resolve(__dirname, "src/utils"),
		},
	},
});
