<script lang="ts">
  import { getZoom } from "$lib/stores/Zoom.svelte";

    let canvas: HTMLCanvasElement

    let canvasWidth = $state(0)
    let canvasHeight = $state(0)

    $effect(() => {
        if(!window)
            return

        if (!canvas)
            throw Error("No canvas found on page.")

        resizeCanvas()

        window.onresize = resizeCanvas

        $effect(() => {
            draw(canvasWidth, canvasHeight, getZoom())
        })

        console.log("Mounted!")
    });

    function resizeCanvas() {
        canvasWidth = window.innerWidth
        canvasHeight = window.innerHeight
    }

    function draw(width: number, height: number, zoom: number) {
        let ctx = canvas.getContext('2d')
        if (!ctx)
            return

        ctx.fillStyle = "black"
        ctx.fillRect(100, 100, 100, 100)
    }
</script>

<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight}></canvas>