import preprocess from "svelte-preprocess";
import vercel from "@sveltejs/adapter-vercel";
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		typescript: {
			tsconfigFile: "./tsconfig.json",
			reportDiagnostics: true,
		},
	}),
	kit: {
		target: "#svelte",
		adapter: vercel(),
	},
};

export default config;
