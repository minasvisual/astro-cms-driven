declare module "astro:actions" {
	type Actions = typeof import("/home/minasvisual/astro-cms-driven/src/actions")["server"];

	export const actions: Actions;
}