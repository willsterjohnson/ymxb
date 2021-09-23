<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import Input from "./_components/Input.svelte";

	onMount(() => {
		if (
			!(
				$page.query.get("x1") &&
				$page.query.get("y1") &&
				$page.query.get("x2") &&
				$page.query.get("y2")
			)
		) {
			goto("/?x1=320&y1=14&x2=1280&y2=20");
		}
	});
	let lastInput = 1;
	let x1 = +$page.query.get("x1") || 320;
	let y1 = +$page.query.get("y1") || 14;
	let x2 = +$page.query.get("x2") || 1280;
	let y2 = +$page.query.get("y2") || 20;
	const reset = () => {
		goto("/?x1=320&y1=14&x2=1280&y2=20");
		x1 = 320;
		y1 = 14;
		x2 = 1280;
		y2 = 20;
	};
	const dec = (num: number) => Math.round(num * 1000) / 1000;
	const ymxb = (
		p1: { x: number; y: number },
		p2: { x: number; y: number },
	) => {
		let slope = (p2.y - p1.y) / (p2.x - p1.x);
		return `clamp(${dec(p1.y / 16)}rem, ${dec(slope * 100)}vmin + ${dec(
			(p1.y - slope * p1.x) / 16,
		)}rem, ${dec(p2.y / 16)}rem)`;
	};
	$: clamp = ymxb({ x: x1, y: y1 }, { x: x2, y: y2 });
</script>

<a
	href={`https://ymxb.netlify.app/?x1=${x1}&y1=${y1}&x2=${x2}&y2=${y2}`}
	class="btn"
>
	We've moved to Netlify. Click here to be redirected with your settings
	saved.
</a>
<main
	on:mouseleave={() => {
		goto(`/?x1=${x1}&y1=${y1}&x2=${x2}&y2=${y2}`);
	}}
	on:blur={() => {
		goto(`/?x1=${x1}&y1=${y1}&x2=${x2}&y2=${y2}`);
	}}
>
	<h1>Responsive CSS Values Using <span>y = mx + b</span></h1>

	<button class="btn" on:click={reset}>Reset</button>
	<div>
		<Input bind:x={x1} bind:y={y1} />
		<Input bind:x={x2} bind:y={y2} />
	</div>
	<div>
		<code>{@html clamp}</code>
	</div>
	<div>
		<p><strong>font-size demo</strong></p>
		<p style="font-size: {clamp}">
			In another moment down went Alice after it, never once considering
			how in the world she was to get out again.
		</p>
	</div>
</main>

<style>
	main {
		width: 95vmin;
		margin: 1rem auto;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	h1,
	.btn {
		width: 100%;
		text-align: center;
	}
	span {
		white-space: nowrap;
	}
	.btn {
		cursor: pointer;
		transition: 300ms;
	}
	.btn:is(:hover, :focus-within) {
		background: var(--black);
		color: var(--white);
	}
	.btn,
	div {
		background: var(--white);
		border-radius: 0.5rem;
		border: none;
	}
	div {
		padding: 1rem;
		width: max(25rem, 45vmin);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		flex-grow: 1;
	}
	div:last-child {
		align-items: center;
		overflow: hidden;
	}
	div:last-child > :first-child {
		max-width: 20rem;
	}
	code {
		font-size: 1.25rem;
	}
	a {
		color: inherit;
		margin-inline: auto;
		padding: 0.5rem;
		width: max-content;
		display: block;
		border-radius: 0 !important;
	}
</style>
