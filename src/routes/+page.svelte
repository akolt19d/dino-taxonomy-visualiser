<script lang="ts">
    import type { PageProps } from './$types';
    import CanvasControls from "$lib/components/CanvasControls.svelte";
    import Canvas from "$lib/components/Canvas.svelte";
    import { getTaxonomyTree } from '$lib/TaxonomyTree';
    import DinoInfo from '$lib/components/DinoInfo.svelte';

    const { data }: PageProps = $props();
    const { taxonomies } = data.parsedData
    const taxonomyTree = getTaxonomyTree(taxonomies)
</script>

<DinoInfo />
<CanvasControls />
<Canvas tree={taxonomyTree} />

