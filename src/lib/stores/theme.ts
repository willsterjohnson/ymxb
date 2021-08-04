import { writable } from "svelte/store";
export const theme = writable<string>(
	typeof localStorage !== "undefined"
		? localStorage.getItem("theme") || "dark"
		: "dark",
);
theme.subscribe((value) => {
	if (typeof localStorage !== "undefined") {
		localStorage.setItem("theme", value);
	}
});
