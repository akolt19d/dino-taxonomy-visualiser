<script lang="ts">
    import { getZoom } from "$lib/stores/Zoom.svelte";
    import { isSelectMode } from "$lib/stores/MouseMode.svelte";
    import { drawContent } from "$lib/DrawContent";

    let canvas: HTMLCanvasElement
    
    let cursorState: string = $state("cursor-grab")
    let isDragging = $state(false)

    let canvasWidth = $state(0)
    let canvasHeight = $state(0)

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
            drawContent(canvas, canvasWidth, canvasHeight, getZoom(), offsetX, offsetY)
        })

        $effect(() => {
            if (isSelectMode())
                cursorState = "default"
            else if (isDragging)
                cursorState = "cursor-grabbing"
            else 
                cursorState = "cursor-grab"
        })

        console.log("Mounted!")
    });

    function resizeCanvas() {
        canvasWidth = window.innerWidth
        canvasHeight = window.innerHeight
    }

    function setCurrentMousePosition(x: number, y: number) {
        mouseX = x
        mouseY = y
    }

    function handleMouseDown(e: MouseEvent) {
        if(isSelectMode())
            return

        const { screenX, screenY } = e
        isDragging = true
        setCurrentMousePosition(screenX, screenY)
    }

    function handleMouseUp(e: MouseEvent) {
        if(isSelectMode())
            return

        const { screenX, screenY } = e
        isDragging = false
        setCurrentMousePosition(screenX, screenY)
    }

    function handleDrag(e: MouseEvent) {
        if (!isDragging || isSelectMode())
            return
            
        const { screenX, screenY } = e
        offsetX += screenX - mouseX
        offsetY += screenY - mouseY
        setCurrentMousePosition(screenX, screenY)
    } 
</script>

<canvas
    bind:this={canvas} 
    onmousedown={handleMouseDown} 
    onmouseup={handleMouseUp} 
    onmousemove={handleDrag}
    width={canvasWidth} 
    height={canvasHeight}
    class="{cursorState}"
></canvas>