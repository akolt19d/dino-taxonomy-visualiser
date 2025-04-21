<script lang="ts">
    import type { PageProps } from './$types';
    import CanvasControls from "$lib/components/CanvasControls.svelte";
    import Canvas from "$lib/components/Canvas.svelte";
    import { getTaxonomyTree, getTreeDepthMap } from '$lib/TaxonomyTree';

    const { data }: PageProps = $props();
    const { dinosaurs, taxonomies } = data.parsedData
    const taxonomyTree = getTaxonomyTree(taxonomies)
    const depthMap = getTreeDepthMap(taxonomyTree)

    // console.log(depthMap)
</script>

<CanvasControls />
<Canvas tree={taxonomyTree} {depthMap} />

