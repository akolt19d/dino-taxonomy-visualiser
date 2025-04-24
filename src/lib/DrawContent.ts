import { Tree } from "./classes/Tree"
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
let drawableTree: Tree;

export function updateTreeData(t: Tree) {
    tree = t

    getTreeDepthMap(tree)
    const { width, height } = calcContainerSize(depthMap)
    const padding = {
        x: 1,
        y: 2
    }
    const containerWidth = (width * templateNode.width) + (padding.x * templateNode.width * (width-1))
    const containerHeight = (height *templateNode.height) + (padding.y * templateNode.height * (height-1))

    container = new Container(0, 0, containerWidth, containerHeight, padding, drawableTree)
    // container.log()
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

function calcContainerSize(depthMap: Map<number, number>) {
    console.log(depthMap)
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

function depth(node: TreeNode, i?: number, parent?: DrawableNode) {
    let index = i ? i : 0

    let set = depthMap.get(index)
    let drawable: DrawableNode | undefined = undefined

    if (set === undefined) {
        drawable = new DrawableNode(0, index, templateNode.width, templateNode.height, "maroon", container, node.value, parent, node.dinosaurData)
        drawable.parent?.addChildNode(drawable)
        depthMap.set(index, 1)
    }
    else {
        drawable = new DrawableNode(set, index, templateNode.width, templateNode.height, "maroon", container, node.value, parent, node.dinosaurData)
        drawable.parent?.addChildNode(drawable)
        depthMap.set(index, set + 1)
    }

    if (parent === undefined) {
        drawableTree = new Tree(drawable)
    }

    for (let child of node.children.values()) {
        depth(child, index+1, drawable)
    }
}

export function getTreeDepthMap(tree: Tree) {
    depthMap = new Map()
    depth(tree.root)

    console.log(drawableTree)
}