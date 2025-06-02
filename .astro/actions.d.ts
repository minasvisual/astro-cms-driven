declare module "astro:actions" {
	type Actions = typeof import("D:/projects/pluggable/astro-cms/src/actions")["server"];

	export const actions: Actions;
}