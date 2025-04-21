import type { Tree } from "./classes/Tree"
import type { TreeNode } from "./classes/TreeNode"
import { Container } from "./classes/Container"
import { DrawableNode } from "./classes/DrawableNode"

interface Drawable {
    width: number
    height: number
}

interface Coordinates {
    x: number
    y: number
}

interface Size {
    w: number
    h: number
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

const container = new Container(0, 0, 2000, 2000)
const node = new DrawableNode(100, 100, templateNode.width, templateNode.height, "blue", container)

export function drawContent(canvas: HTMLCanvasElement, tree: Tree, depthMap: Map<number, number>, width: number, height: number, zoom: number, offsetX: number, offsetY: number): void {
    if (!canvas)
        return

    let ctx = canvas.getContext('2d')
    if (!ctx)
        return

    setGlobals(offsetX, offsetY, zoom)

    ctx.clearRect(0, 0, width, height)

    ctx.fillStyle = "black"
    ctx.font = `${30*zoom}px Arial`
    
    container.transform(globals.zoom, globals.offsetX, globals.offsetY)
    container.draw(ctx)

    node.scale(globals.zoom)
    node.draw(ctx)

    // drawContainer(ctx, depthMap)

    // console.log(depthMap)

    // spaceNodes(ctx, depthMap)
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

function calcSize(w: number, h: number): Size {
    return {
        w: w*globals.zoom,
        h: h*globals.zoom
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

function drawContainer(ctx: CanvasRenderingContext2D, depthMap: Map<number, number>) {
    const coords = calcCoords(0, 0)
    const size = calcSize(2000, 2000)

    ctx.fillStyle = "red"
    ctx.fillRect(coords.x, coords.y, size.w, size.h)
    ctx.fillStyle = "black"
}