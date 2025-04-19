export function drawContent(canvas: HTMLCanvasElement, width: number, height: number, zoom: number, offsetX: number, offsetY: number): void {
    if (!canvas)
        return

    let ctx = canvas.getContext('2d')
    if (!ctx)
        return

    const dragSpeed = Math.min(Math.max(zoom, 0.5), 2)/2
    const posX = (100 + offsetX) * dragSpeed
    const posY = (100 + offsetY) * dragSpeed

    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = "black"
    ctx.fillRect(posX, posY, 100*zoom, 100*zoom)
}