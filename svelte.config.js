import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import copy from 'rollup-plugin-copy';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: () => ({
			plugins: [copy({
				targets: [{ src: 'node_modules/bootstrap/dist/**/*', dest: 'static/assets/bootstrap' }],
			})]
		})
	}
};

export default config;
