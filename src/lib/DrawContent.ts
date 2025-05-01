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
    width: 300,
    height: 50
}

let tree: Tree;
let depthMap: Map<number, number>;

let container: Container
let drawableTree: Tree;

let selectedNode: DrawableNode | undefined = undefined

export function updateTreeData(t: Tree) {
    tree = t

    getTreeDepthMap(tree)
    const { width, height } = calcContainerSize(depthMap)
    const padding = {
        x: 1.5,
        y: 7.5
    }
    const containerWidth = (width * templateNode.width) + (padding.x * templateNode.width * (width-1))
    const containerHeight = (height *templateNode.height) + (padding.y * templateNode.height * (height-1))

    container = new Container(0, 0, containerWidth, containerHeight, padding, drawableTree)
    // container.log()
    // console.log(...drawableTree.root.nodes())
}

export function drawContent(canvas: HTMLCanvasElement, width: number, height: number, zoom: number, offsetX: number, offsetY: number): void {
    if (!canvas)
        return

    let ctx = canvas.getContext('2d')
    if (!ctx)
        return

    setGlobals(offsetX, offsetY, zoom)

    ctx.clearRect(0, 0, width, height)
    
    container.transform(globals.zoom, globals.offsetX, globals.offsetY)
    container.draw(ctx, width, height)
}

export function handleCanvasClick(x: number, y: number, callback: (dinosaur: Dinosaur | undefined) => void): void {
    if (container === undefined || drawableTree === undefined)
        return

    for (const node of drawableTree.nodes()) {
        if (!(node instanceof DrawableNode))
            return 

        if (node.isClicked(x, y)) {
            if (selectedNode !== undefined) {
                selectedNode.deselect()
                callback(undefined)
            }

            if (node === selectedNode) {
                selectedNode = undefined
                return
            }

            node.select()
            selectedNode = node

            if (node.isDinosaur)
                callback(node.dinosaurData!)

            break
        }
    }
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
        drawable = new DrawableNode(index, templateNode.width, templateNode.height, "maroon", container, node.value, parent, node.dinosaurData)
        drawable.parent?.addChildNode(drawable)
        depthMap.set(index, 1)
    }
    else {
        drawable = new DrawableNode(index, templateNode.width, templateNode.height, "maroon", container, node.value, parent, node.dinosaurData)
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

    if(drawableTree.root instanceof DrawableNode)
        drawableTree.root.spaceChildren(0)
    console.log(drawableTree)
}