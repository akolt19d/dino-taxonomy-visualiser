import { clamp } from "$lib/Utils"
import { DrawableNode } from "./DrawableNode"
import type { Tree } from "./Tree"

function isNotVisibleOnCanvas(x: number, y: number, width: number, height: number, canvasWidth: number, canvasHeight: number): boolean {
    return (x > canvasWidth || x + width < 0 || y > canvasHeight || y + height < 0)
}

function isConnectionNotVisibleOnCanvas(start: { x: number, y: number }, end: { x: number, y: number }, canvasWidth: number, canvasHeight: number): boolean {
    const x = Math.min(start.x, end.x)
    const y = Math.min(start.y, end.y)

    const width = Math.abs(start.x - end.x)
    const height = Math.abs(start.y - end.y)

    return (x > canvasWidth || x + width < 0 || y > canvasHeight || y + height < 0)
}

export class Container {
    private _x: number
    private _y: number
    private _width: number
    private _height: number 
    private _padding: { x: number, y: number }
    private _tree: Tree
    private _lineWidth: number = 5

    public x: number 
    public y: number
    public width: number
    public height: number
    public padding: { x: number, y: number }
    public lineWidth: number = this._lineWidth

    constructor(x: number, y: number, width: number, height: number, padding: { x: number, y: number }, tree: Tree) {
        this._tree = tree
        this._x = x
        this._y = y
        this._width = width
        this._height = height
        this._padding = padding

        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.padding = padding
    }

    private _dragSpeed(zoom: number): number {
        // [0.05, 0.1, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2]
        switch (zoom) {
            case 0.05:
                return 8
            case 0.1:
                return 6
            case 0.2:
                return 2
            case 0.4:
                return 1.5
            case 0.5:
            case 0.6:
            case 0.7:
            case 0.8:
                return 1
            case 0.9:
            case 1:
            case 2:
                return .5
            default:
                return 1
        }
    }

    public draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
        // if (isNotVisibleOnCanvas(this.x, this.y, this.width, this.height, canvasWidth, canvasHeight))
        //     return

        // ctx.fillStyle = "brown"
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        // ctx.strokeStyle = "green"
        // ctx.lineWidth = 2
        // ctx.strokeRect(this.x, this.y, this.width, this.height)

        this.drawNodes(ctx, canvasWidth, canvasHeight)
    }

    public transform(zoom: number, offsetX: number, offsetY: number): void {
        this.x = (this._x + offsetX) * this._dragSpeed(zoom)
        this.y = (this._y + offsetY) * this._dragSpeed(zoom)
        this.width = this._width * zoom
        this.height = this._height * zoom
        this.lineWidth = Math.max(Math.round(this._lineWidth * zoom), 2)

        this.scaleNodes(zoom)
    }

    public log(): void {
        console.log(`Container: ${this.x}, ${this.y}, ${this.width}, ${this.height}`)
        console.log(`Padding: ${this.padding.x}, ${this.padding.y}`)
        this._tree.nodes().forEach(node => {
            if (!(node instanceof DrawableNode))
                return

            console.log(`Node '${node.value}': ${node.columnIndex}, ${node.rowIndex} ${node.isDinosaur ? "<--- Dinosaur" : ""}`)
        })
    }

    private scaleNodes(zoom: number): void {
        this._tree.nodes().forEach(node => {
            if (!(node instanceof DrawableNode))
                return 

            node.scale(zoom)
        })
    }

    private connectNodes(ctx: CanvasRenderingContext2D, startNode: DrawableNode, endNode: DrawableNode): void {
        const start = startNode.topAnchor
        const end = endNode.bottomAnchor

        if (!start || !end)
            return

        ctx.strokeStyle = startNode.selected ? "blue" : "white"
        ctx.lineWidth = startNode.selected ? this.lineWidth*2 : this.lineWidth
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)

        if (!startNode.selected)
            ctx.globalCompositeOperation='destination-over'

        let breakpoint = ((start.y - end.y) * this.padding.y)/(2 * this.padding.y)
        let direction = Math.sign(start.x - end.x)

        switch (direction) {
            case 0:
                ctx.lineTo(end.x, end.y)
                break;
            default:
                let colDistance = Math.abs(startNode.columnIndex - endNode.columnIndex)
                if (colDistance < 1 && colDistance > 0) {
                    ctx.bezierCurveTo(start.x, start.y - breakpoint, end.x, end.y + breakpoint, end.x, end.y)
                } else {
                ctx.arcTo(start.x, start.y - breakpoint, start.x - (breakpoint * direction), start.y - breakpoint, breakpoint)
                ctx.lineTo(end.x + (breakpoint * direction), end.y + breakpoint)
                ctx.arcTo(end.x, end.y + breakpoint, end.x, end.y, breakpoint)
                }
                break;
        }

        ctx.stroke()
        ctx.globalCompositeOperation='source-over'
    }

    private drawNodes(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
        this._tree.nodes().forEach(node => {
            if (!(node instanceof DrawableNode))
                return 

            const x = this.x + (node.columnIndex * node.width/32) + (this.padding.x * node.width * node.columnIndex)
            const y = this.y + (node.rowIndex * node.height) + (this.padding.y * node.height * node.rowIndex)

            node.setPosition(x, y)
            
            if (node.parent && node.parent instanceof DrawableNode) {
                if (!isConnectionNotVisibleOnCanvas(node.topAnchor!, node.parent.bottomAnchor!, canvasWidth, canvasHeight))
                    this.connectNodes(ctx, node, node.parent)
            }

            if (isNotVisibleOnCanvas(x, y, node.width, node.height, canvasWidth, canvasHeight))
                return

            node.draw(ctx)
        })
    }
}