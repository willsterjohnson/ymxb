<script lang="ts">
	export let title: string;
	export let url: string;
	export let image: string;
	export let description: string;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={url + image} />
	<meta property="og:description" content={description} />
</svelte:head>

<style>
</style>
