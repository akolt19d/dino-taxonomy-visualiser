import type { Tree } from "./classes/Tree"
import type { TreeNode } from "./classes/TreeNode"
import { Container } from "./classes/Container"
import { DrawableNode } from "./classes/DrawableNode"

let globals = {
    offsetX: 0,
    offsetY: 0,
    zoom: 0
}

const templateNode = {
    width: 200,
    height: 200
}

let tree: Tree;
let depthMap: Map<number, number>;

let container: Container
let nodes: DrawableNode[] = []

export function updateTreeData(t: Tree, d: Map<number, number>) {
    tree = t
    depthMap = d
    console.log(d)

    const { width, height } = calcContainerSize(depthMap)
    const padding = {
        x: 1,
        y: 1
    }
    const containerWidth = (width * templateNode.width) + (padding.x * templateNode.width * (width-1))
    const containerHeight = (height *templateNode.height) + (padding.y * templateNode.height * (height-1))

    spaceNodes()
    container = new Container(0, 0, containerWidth, containerHeight, padding, nodes)
    container.log()
}

export function drawContent(canvas: HTMLCanvasElement, width: number, height: number, zoom: number, offsetX: number, offsetY: number): void {
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
    container.draw(ctx, width, height)
}

function setGlobals(offsetX: number, offsetY: number, zoom: number) {
    globals.offsetX = offsetX
    globals.offsetY = offsetY
    globals.zoom = zoom
}

function spaceNodes() {
    for (const [depthIndex, amount] of depthMap.entries()) {
        for (let columnIndex = 0; columnIndex < amount; columnIndex++) {
            const node = new DrawableNode(columnIndex, depthIndex, templateNode.width, templateNode.height, "blue", container)
            nodes.push(node)
        }
    }
}

function calcContainerSize(depthMap: Map<number, number>) {
    let maxWidth = 0
    let maxHeight = 0

    for (const [depthIndex, amount] of depthMap.entries()) {
        maxHeight += 1
        if (amount > maxWidth) {
            maxWidth = amount
        }
    }

    return { width: maxWidth, height: maxHeight }
}