import preprocess from "svelte-preprocess";
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
	},
};

export default config;
