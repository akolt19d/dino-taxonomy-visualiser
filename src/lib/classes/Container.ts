import { clamp } from "$lib/Utils"
import { DrawableNode } from "./DrawableNode"
import type { Tree } from "./Tree"

function isVisibleOnCanvas(x: number, y: number, width: number, height: number, canvasWidth: number, canvasHeight: number): boolean {
    return (x > canvasWidth || x + width < 0 || y > canvasHeight || y + height < 0)
}

export class Container {
    private _x: number
    private _y: number
    private _width: number
    private _height: number 
    private _padding: { x: number, y: number }
    private _tree: Tree

    public x: number 
    public y: number
    public width: number
    public height: number
    public padding: { x: number, y: number }

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
        return clamp(0.5, zoom, 2)/2
    }

    public draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
        if (isVisibleOnCanvas(this.x, this.y, this.width, this.height, canvasWidth, canvasHeight))
            return

        ctx.fillStyle = "brown"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = "green"
        ctx.lineWidth = 10
        ctx.strokeRect(this.x, this.y, this.width, this.height)

        this.drawNodes(ctx, canvasWidth, canvasHeight)
    }

    public transform(zoom: number, offsetX: number, offsetY: number): void {
        this.x = (this._x + offsetX) * this._dragSpeed(zoom)
        this.y = (this._y + offsetY) * this._dragSpeed(zoom)
        this.width = this._width * zoom
        this.height = this._height * zoom

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

    private drawNodes(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
        this._tree.nodes().forEach(node => {
            if (!(node instanceof DrawableNode))
                return 

            const x = this.x + (node.columnIndex * node.width) + (this.padding.x * node.width * node.columnIndex)
            const y = this.y + (node.rowIndex * node.height) + (this.padding.y * node.height * node.rowIndex)
            
            if (isVisibleOnCanvas(x, y, node.width, node.height, canvasWidth, canvasHeight))
                return

            node.draw(ctx, x, y)
        })
    }
}