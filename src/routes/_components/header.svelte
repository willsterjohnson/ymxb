<script lang="ts">
	import { theme } from "../../lib/stores/theme";

	export let style: string = "";
	export let func: string;
</script>

<header {style}>
	<button
		on:click={() => {
			$theme = $theme === "dark" ? "light" : "dark";
		}}>{$theme}</button
	>
	<h1>y = mx + b to <span>{func}</span></h1>
</header>

<style lang="scss">
	header {
		min-height: 8rem;
		height: max-content;
		background: var(--brand);
		display: flex;
		align-items: center;
		position: relative;
		button,
		button:active:not(:hover) {
			position: absolute;
			top: min(2vw, 1rem);
			left: min(2vw, 1rem);
			font-size: 1rem;
			max-height: 2rem;
			background: var(--bg);
			color: var(--fg-thin);
			border: 1px solid var(--fg-thin);
			border-radius: 0.125rem;
			padding: 0 0.25rem 0.125rem;
			width: 5rem;
			&:hover,
			&:focus {
				cursor: pointer;
				border: 1px solid var(--fg);
				color: var(--fg);
			}
		}
		h1 {
			color: var(--fg);
			font-size: max(1.5rem, calc(5.625vmin - 0.125rem));
			max-width: 80%;
			margin: 0 auto;
			padding-bottom: 2rem;
			position: relative;
			font-family: "Helvetica Neue", Helvetica, sans-serif;
			&::after {
				content: "Responsive CSS with linear equations";
				font-size: 1rem;
				position: absolute;
				bottom: 0.5rem;
				right: -1.5rem;
				width: max-content;
				max-width: 95vw;
			}
			span {
				font-family: "Liberation Mono", monospace;
				background: var(--bg);
				display: inline-block;
				width: max-content;
				padding: 0 0.5rem;
			}
		}
	}
</style>
