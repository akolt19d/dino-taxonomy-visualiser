import { clamp } from "$lib/Utils"
import type { Container } from "./Container"
import { TreeNode } from "./TreeNode"

export class DrawableNode extends TreeNode {
    private _width: number
    private _height: number 
    private _color: string
    private _container: Container

    public columnIndex: number 
    public rowIndex: number
    public width: number
    public height: number

    constructor(columnIndex: number, rowIndex: number, width: number, height: number, color: string, container: Container, value: string, parent?: TreeNode) {
        super(value, parent)

        this._width = width
        this._height = height
        this._color = color
        this._container = container

        this.columnIndex = columnIndex
        this.rowIndex = rowIndex
        this.width = width
        this.height = height
    }

    public scale(zoom: number): void {
        this.width = this._width * zoom
        this.height = this._height * zoom
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = this._color
        ctx.fillRect(x, y, this.width, this.height)
        ctx.strokeStyle = "white"
        ctx.lineWidth = 5
        ctx.strokeRect(x, y, this.width, this.height)
    }
}