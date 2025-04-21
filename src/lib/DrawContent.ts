import type { Tree } from "./classes/Tree"
import type { TreeNode } from "./classes/TreeNode"

interface Drawable {
    width: number
    height: number
}

interface Coordinates {
    x: number
    y: number
}

let globals = {
    offsetX: 0,
    offsetY: 0,
    zoom: 0
}

let templateNode: Drawable = {
    width: 200,
    height: 80
}

export function drawContent(canvas: HTMLCanvasElement, tree: Tree, depthMap: Map<number, number>, width: number, height: number, zoom: number, offsetX: number, offsetY: number): void {
    if (!canvas)
        return

    let ctx = canvas.getContext('2d')
    if (!ctx)
        return

    setGlobals(offsetX, offsetY, zoom/4)

    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = "black"
    ctx.font = `${30*zoom}px Arial`
    // ctx.fillRect(posX, posY, 100*zoom, 100*zoom)
    // drawNode(ctx, tree.root, calcCoords(300, 300))

    // console.log(depthMap)

    spaceNodes(ctx, depthMap)
}

function setGlobals(offsetX: number, offsetY: number, zoom: number) {
    globals.offsetX = offsetX
    globals.offsetY = offsetY
    globals.zoom = zoom
}

function calcCoords(x: number, y: number): Coordinates {
    const dragSpeed = Math.min(Math.max(globals.zoom, 0.5), 2)/2
    const posX = (x + globals.offsetX) * dragSpeed
    const posY = (y + globals.offsetY) * dragSpeed
    return {
        x: posX,
        y: posY
    }
}

function spaceNodes(ctx: CanvasRenderingContext2D, depthMap: Map<number, number>) {
    const padding = (templateNode.width*1)*globals.zoom
    for (const [depthIndex, amount] of depthMap.entries()) {
        // console.log(depthIndex, amount)
        for (let columnIndex = 0; columnIndex < amount; columnIndex++) {
            // console.log(j)
            let coords = calcCoords( columnIndex * (templateNode.width + padding), (templateNode.height + padding) + (templateNode.height + padding)*depthIndex )
            ctx.fillRect(coords.x, coords.y, templateNode.width*globals.zoom, templateNode.height*globals.zoom)
        }
    }
}

function drawNode(ctx: CanvasRenderingContext2D, node: TreeNode, coords: Coordinates) {
    ctx.fillText(node.value, coords.x, coords.y)
}

function drawRect(ctx: CanvasRenderingContext2D, coords: Coordinates) {

}