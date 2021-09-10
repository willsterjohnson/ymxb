<script lang="ts">
	export let x: number;
	export let y: number;
</script>

<p>
	<span>When vmin is</span>
	<label for="">
		<input type="number" bind:value={x} />
		pixels in size,
	</label><br />
	<span>make the value</span>
	<label>
		<input type="number" bind:value={y} />
		pixels.
	</label>
</p>

<style>
	span {
		display: inline-block;
		width: 13ch;
	}
	input {
		width: 8ch;
		height: 1.25rem;
	}
</style>
