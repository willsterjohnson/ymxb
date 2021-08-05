<script lang="ts">
	import { onMount } from "svelte";

	import { theme } from "../lib/stores/theme";
	import Header from "./_components/header.svelte";

	// init settings + type
	interface settings {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
		mult: number;
		mx: string;
		b: string;
		decimal: number;
		isimportant: boolean;
		iscomment: boolean;
		id: number;
		func: string;
	}
	let settings: settings = {
		x1: 320,
		y1: 14,
		x2: 1280,
		y2: 20,
		mult: 1,
		mx: "vmin",
		b: "rem",
		decimal: 3,
		isimportant: false,
		iscomment: false,
		id: 0,
		func: "calc( )",
	};
	// init id counter
	let id = 0;
	// init saved data
	let cssVals = [] as settings[];
	// generate css from input data
	const css = (setting: settings) => {
		let out: string;
		let slope =
			((setting.y2 - setting.y1) / (setting.x2 - setting.x1)) * 100;
		let coefficient1 =
			settings.b === "rem" ? settings.y1 / 16 : settings.y1;
		let coefficient2 =
			settings.b === "rem" ? settings.y2 / 16 : settings.y2;

		slope = parseFloat(slope.toFixed(setting.decimal));
		coefficient1 = parseFloat(coefficient1.toFixed(setting.decimal));

		if (setting.func.includes("calc( )")) {
			out = `calc(${slope}${settings.mx} + ${coefficient1}${settings.b})`;
		}

		// if (setting.mult !== 1) {
		// 	out = `calc(${out} * ${setting.mult})`;
		// }

		if (setting.func.includes("clamp( )")) {
			out = `clamp(${coefficient1}${settings.b}, ${slope}${settings.mx} + ${coefficient1}${settings.b}, ${coefficient2}${settings.b})`;
		}

		return setting.isimportant ? `${out} !important;` : `${out};`;
	};
	// generate comment from input data
	const comment = (setting: settings) =>
		setting.iscomment
			? `/* p1(${setting.x1}px,${setting.y1}px) */ /* p2(${setting.x2}px,${setting.y2}px) */`
			: "";
	// save settings
	const save = (setting: settings) => {
		cssVals = [...cssVals, { ...setting }];
		id++;
		settings.id = id;
		console.log(settings.id);
	};
	// load saved data
	const load = (setting: settings) => (settings = setting);

	// theme toggle
	let th: { fg: string; bg: string; fgt: string; bgt: string };
	onMount(() => {
		theme.subscribe((value: string) => {
			document.querySelector<HTMLBodyElement>("body").className = value;
		});
	});
</script>

<Header func={settings.func} />
<!-- style="--fg: {th.fg}; --bg: {th.bg}; --fg-thin: {th.fgt}; --bg-thin:{th.bgt}" -->
<div class="grid">
	<!-- style="--fg: {th.fg}; --bg: {th.bg}; --fg-thin: {th.fgt}; --bg-thin:{th.bgt}" -->
	<div class="control">
		<h2>Points</h2>
		<p>
			<span>p1(x1,y1)</span>
			<input class="point-x1" type="number" bind:value={settings.x1} />
			<input class="point-y1" type="number" bind:value={settings.y1} />
		</p>
		<p>
			<span>p2(x2,y2)</span>
			<input class="point-x2" type="number" bind:value={settings.x2} />
			<input class="point-y2" type="number" bind:value={settings.y2} />
		</p>
		<!-- <h2>Result</h2>
		<p>
			<span>Multiple by</span>
			<input type="number" bind:value={settings.mult} />
		</p> -->
		<h2>Units</h2>
		<p>
			<span>mx</span>
			<select bind:value={settings.mx}>
				<option value="vmin">vmin</option>
				<option value="vmax">vmax</option>
				<option value="vh">vh</option>
				<option value="vw">vw</option>
			</select>
		</p>
		<p>
			<span>b</span>
			<select bind:value={settings.b}>
				<option value="rem">rem</option>
				<option value="px">px</option>
			</select>
		</p>
		<p>
			<span>Decimals</span>
			<input
				type="number"
				max="5"
				min="1"
				bind:value={settings.decimal}
			/>
		</p>
		<h2>CSS</h2>
		<p>
			<span>!important</span>
			<input type="checkbox" bind:checked={settings.isimportant} />
		</p>
		<p>
			<span>Comment</span>
			<input type="checkbox" bind:checked={settings.iscomment} />
		</p>
		<p>
			<span>Format</span>
			<select id="format" bind:value={settings.func}>
				<option value=" calc( )"> calc( )</option>
				<option value="clamp( )">clamp( )</option>
			</select>
		</p>
	</div>
	<div class="result">
		<h2>
			<button
				on:click={() => {
					cssVals = [];
				}}>Clear</button
			> <span>CSS Value</span>
		</h2>
		<div class="cssval">
			<p>
				{css(settings)}
				{comment(settings)}
			</p>
			<button on:click={() => save(settings)} class="save">save</button>
		</div>
		<div>
			{#each cssVals as cssVal (cssVal.id)}
				<div class="cssval">
					<p>
						<span id="css">{css(cssVal)}</span>
						{comment(cssVal)}
					</p>
					<button on:click={() => load(cssVal)} class="edit"
						>load</button
					>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.grid {
		display: flex;
		flex-direction: row;
		margin: 5rem auto;
		gap: 0.25rem;
		width: max-content;
		max-width: 95vw;

		@media (max-width: 60rem) {
			flex-direction: column;

			> div {
				min-width: 100% !important;
				width: 80vw !important;
			}
		}

		> div {
			min-height: 30rem;
			min-width: 20rem;
			width: max-content;
			background: var(--bg);
			padding: min(2vw, 1rem);
			border-radius: 0.125rem;

			&.result {
				width: min(60rem, 100%);
				min-width: calc(30vw - 2rem);
				min-height: 8rem;
				margin: 0 auto;
				color: var(--fg);
				h2 {
					display: flex;
					justify-content: space-between;
				}
				> div {
					max-height: 35rem;
					overflow-y: scroll;
					margin-top: 0.25rem;
					@media (max-width: 60rem) {
						max-height: max-content;
					}
				}
			}

			h2 {
				color: var(--fg-thin);
				text-align: right;
				border-bottom: 1px solid var(--fg-thin);
			}

			p {
				margin: 0.25rem 0;

				span {
					color: var(--fg);
					display: inline-block;
					max-width: 7rem;
					width: max(5rem, 12vw);
					min-width: max-content;
				}

				input,
				select {
					background: transparent;
					width: 5rem;
					border: 1px solid var(--fg-thin);
					border-radius: 0.125rem;
					color: var(--fg);
				}
				select#format {
					width: min(10.5rem, 100%);
				}
				input[type*="checkbox"] {
					width: 1rem;
				}
			}
		}
	}
	.cssval {
		margin-bottom: 0.5rem;
		display: flex;
		justify-content: end;
		gap: 0.5rem;
		p {
			width: 100%;
		}
	}
	button,
	button:active:not(:hover) {
		font-size: 1rem;
		max-height: 2rem;
		background: transparent;
		color: var(--fg-thin);
		border: 1px solid var(--fg-thin);
		border-radius: 0.125rem;
		padding: 0 0.25rem 0.125rem;
		width: 5rem;
		&:hover,
		&:focus {
			cursor: pointer;
			border: 1px solid white;
			color: white;
		}
	}
</style>
