import type { Container } from "./Container"

export class DrawableNode {
    private _x: number
    private _y: number
    private _width: number
    private _height: number 
    private _color: string
    private _container: Container

    public x: number 
    public y: number
    public width: number
    public height: number

    constructor(x: number, y: number, width: number, height: number, color: string, container: Container) {
        this._x = x
        this._y = y
        this._width = width
        this._height = height
        this._color = color
        this._container = container

        this.x = x + container.x
        this.y = y + container.y
        this.width = width
        this.height = height
    }

    public scale(zoom: number): void {
        const dragSpeed = Math.min(Math.max(zoom, 0.5), 2)/2
        this.x = (this._x * dragSpeed) + this._container.x
        this.y = (this._y * dragSpeed) + this._container.y
        this.width = this._width * zoom
        this.height = this._height * zoom
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this._color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = "white"
        ctx.lineWidth = 5
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
}