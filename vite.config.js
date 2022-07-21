import { sveltekit } from '@sveltejs/kit/vite';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

/** @type {import('vite').UserConfig} */
const config = {
        plugins: [
            sveltekit(),
            copy({
				targets: [
					{ src: 'node_modules/bootstrap/dist/**/*', dest: 'static/assets/bootstrap' },
					{ src: 'node_modules/bootstrap-icons/**/*', dest: 'static/assets/bootstrap-icons' }
				],
			}),
			replace({
				'process.env.NODE_ENV': JSON.stringify('production'),
				 include: '**/node_modules/**',
			})
        ]
};

export default config;