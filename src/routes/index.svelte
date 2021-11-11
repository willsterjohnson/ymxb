<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import Input from "./_components/Input.svelte";
	import SEO from "./_components/SEO.svelte";

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
		return `clamp(
      <br />&nbsp;&nbsp;${dec(p1.y / 16)}rem,
      <br />&nbsp;&nbsp;${dec(slope * 100)}vmin + ${dec(
			(p1.y - slope * p1.x) / 16,
		)}rem,
      <br />&nbsp;&nbsp;${dec(p2.y / 16)}rem
      <br />)`;
	};

	$: clamp = ymxb({ x: x1, y: y1 }, { x: x2, y: y2 });

	const pure = (c: string) => c.replace(/<br \/>|&nbsp;/g, "");
</script>

<SEO
	title="Responsive CSS | willsterjohnson.com"
	url="https://ymxb.willsterjohnson.com"
	image="/seo.png"
	description="Responsive and accessible CSS values without the hassle."
/>
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
	<section class="demo">
		<h2><code>font-size</code> demo</h2>
		<p style="font-size: {pure(clamp)}">
			In another moment down went Alice after it, never once considering
			how in the world she was to get out again.
		</p>
	</section>
	<section class="demo">
		<h2><code>border-width</code> demo</h2>
		<p
			style="border: 1px solid var(--black); border-width: {pure(
				clamp,
			)}; "
		>
			In another moment down went Alice after it, never once considering
			how in the world she was to get out again.
		</p>
	</section>
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
	button {
		width: 100%;
		text-align: center;
	}
	span {
		white-space: nowrap;
	}
	button {
		cursor: pointer;
		transition: 300ms;
	}
	button:is(:hover, :focus-within) {
		background: var(--black);
		color: var(--white);
	}
	button,
	div,
	section,
	h1 {
		background: var(--white);
		border-radius: 0.5rem;
		border: none;
	}
	div,
	section {
		padding: 1rem;
		width: max(25rem, 45vmin);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		flex-grow: 1;
	}
	section.demo {
		align-items: center;
		width: 100%;
		overflow: hidden;
	}
	code {
		background: #0001;
		padding: 0.5rem;
		border-radius: 0.25rem;
		width: 100%;
		height: 100%;
	}
	h2 code {
		padding: 0.25rem 0.25rem 0;
	}
</style>
