<script lang="ts">
	export let x: number;
	export let y: number;
	export let label: string;
</script>

<p>
	<span>When vmin is</span>
	<input aria-label="vmin size for {label}" type="number" bind:value={x} />
	pixels in size,
	<br />
	<span>make the value</span>
	<input
		aria-label="property size for {label}"
		type="number"
		bind:value={y}
	/>
	pixels.
</p>

<style>
	span {
		display: inline-block;
		width: 13ch;
	}
	input {
		-webkit-appearance: none;
		border-radius: 0.25rem;
		border: 2px solid #0002;
		width: 8ch;
		padding: 0 0 0 0;
		height: 1.3rem;
		transition: 300ms;
		overflow: hidden;
	}
	input:focus {
		border: 2px solid #000;
	}
</style>
