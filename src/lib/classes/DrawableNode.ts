import { clamp } from "$lib/Utils"
import type { Container } from "./Container"

export class DrawableNode {
    private _width: number
    private _height: number 
    private _color: string
    private _container: Container

    public columnIndex: number 
    public rowIndex: number
    public width: number
    public height: number

    constructor(columnIndex: number, rowIndex: number, width: number, height: number, color: string, container: Container) {
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
        // const dragSpeed = clamp(0.5, zoom, 2)/2
        // this.x = (this._x * dragSpeed) + this._container.x
        // this.y = (this._y * dragSpeed) + this._container.y
        this.width = this._width * zoom
        this.height = this._height * zoom
    }

    // public draw(ctx: CanvasRenderingContext2D): void {
    //     ctx.fillStyle = this._color
    //     ctx.fillRect(this.x, this.y, this.width, this.height)
    //     ctx.strokeStyle = "white"
    //     ctx.lineWidth = 5
    //     ctx.strokeRect(this.x, this.y, this.width, this.height)
    // }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillStyle = this._color
        ctx.fillRect(x, y, this.width, this.height)
        ctx.strokeStyle = "white"
        ctx.lineWidth = 5
        ctx.strokeRect(x, y, this.width, this.height)
    }
}