<script lang="ts">
    import type { PageProps } from './$types';
    import CanvasControls from "$lib/components/CanvasControls.svelte";
    import Canvas from "$lib/components/Canvas.svelte";

    const { data }: PageProps = $props();
    const dinosaurData: Dinosaur[] = data.parsedData

    // console.log(dinosaurData)
</script>

<CanvasControls />
<Canvas />

