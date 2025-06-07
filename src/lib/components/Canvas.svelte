<script lang="ts">
    import { getZoom } from "$lib/stores/Zoom.svelte";
    import { isMoveMode, isSelectMode } from "$lib/stores/MouseMode.svelte";
    import { drawContent, handleCanvasClick, updateTreeData } from "$lib/DrawContent";
    import { setSelectedDinosaur, getSelectedDinosaur } from "$lib/stores/SelectedDinosaur.svelte";

    let { tree } = $props()

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
            updateTreeData(tree)
            console.log("Tree data updated.")
        })

        $effect(() => {
            getSelectedDinosaur()   // Force canvas redraw when selected dinosaur changes
            let zoom = getZoom()
            drawContent(canvas, canvasWidth, canvasHeight, zoom, offsetX*zoom, offsetY*zoom)
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

        const { clientX, clientY } = e
        isDragging = true
        setCurrentMousePosition(clientX, clientY)
    }

    function handleMouseUp(e: MouseEvent) {
        if(isSelectMode())
            return

        const { clientX, clientY } = e
        isDragging = false
        setCurrentMousePosition(clientX, clientY)
    }

    function handleDrag(e: MouseEvent) {
        if (!isDragging || isSelectMode())
            return
            
        const { clientX, clientY } = e
        offsetX += clientX - mouseX
        offsetY += clientY - mouseY
        setCurrentMousePosition(clientX, clientY)
    } 

    function handleClick(e: MouseEvent) {
        if (isMoveMode())
        return
    
        const { layerX, layerY } = e
        let zoom = getZoom()
        handleCanvasClick(layerX, layerY, (dinosaur: Dinosaur | undefined) => {
            setSelectedDinosaur(dinosaur)
        })
        drawContent(canvas, canvasWidth, canvasHeight, zoom, offsetX*zoom, offsetY*zoom)
    }
</script>

<canvas
    bind:this={canvas} 
    onmousedown={handleMouseDown} 
    onmouseup={handleMouseUp} 
    onmousemove={handleDrag}
    onclick={handleClick}
    width={canvasWidth} 
    height={canvasHeight}
    class="{cursorState}"
></canvas>