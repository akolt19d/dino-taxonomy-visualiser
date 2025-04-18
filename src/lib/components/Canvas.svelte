<script lang="ts">
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

        console.log("Mounted!")
    });

    function resizeCanvas() {
        canvasWidth = window.innerWidth
        canvasHeight = window.innerHeight
    }
</script>

<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight}></canvas>