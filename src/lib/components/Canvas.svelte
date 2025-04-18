<script lang="ts">
  import { getZoom } from "$lib/stores/Zoom.svelte";

    let canvas: HTMLCanvasElement

    let canvasWidth = $state(0)
    let canvasHeight = $state(0)

    let isDragging = $state(false)

    let offsetX = $state(0)
    let offsetY = $state(0)

    let mouseX = $state(0)
    let mouseY = $state(0)

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

        const dragSpeed = Math.min(zoom, 0.5)
        const posX = (100 + offsetX) * dragSpeed
        const posY = (100 + offsetY) * dragSpeed

        ctx.clearRect(0, 0, width, height)

        ctx.fillStyle = "black"
        ctx.fillRect(posX, posY, 100*zoom, 100*zoom)
    }

    function handleMouseDown(e: MouseEvent) {
        const { screenX, screenY } = e
        isDragging = true
        setCurrentMousePosition(screenX, screenY)
    }

    function handleMouseUp(e: MouseEvent) {
        const { screenX, screenY } = e
        isDragging = false
        setCurrentMousePosition(screenX, screenY)
    }

    function handleDrag(e: MouseEvent) {
        if (!isDragging)
            return
            
        const { screenX, screenY } = e
        offsetX += screenX - mouseX
        offsetY += screenY - mouseY
        setCurrentMousePosition(screenX, screenY)
    } 

    function setCurrentMousePosition(x: number, y: number) {
        mouseX = x
        mouseY = y
    }
</script>

<canvas 
    bind:this={canvas} 
    onmousedown={handleMouseDown} 
    onmouseup={handleMouseUp} 
    onmousemove={handleDrag}
    width={canvasWidth} 
    height={canvasHeight}
    class="{isDragging ? "cursor-grabbing" : "cursor-grab"}"
></canvas>