export class Container {
    private _x: number
    private _y: number
    private _width: number
    private _height: number 

    public x: number 
    public y: number
    public width: number
    public height: number

    constructor(x: number, y: number, width: number, height: number) {
        this._x = x
        this._y = y
        this._width = width
        this._height = height

        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "brown"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = "white"
        ctx.lineWidth = 10
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }

    public transform(zoom: number, offsetX: number, offsetY: number): void {
        const dragSpeed = Math.min(Math.max(zoom, 0.5), 2)/2

        this.x = (this._x + offsetX) * dragSpeed
        this.y = (this._y + offsetY) * dragSpeed
        this.width = this._width * zoom
        this.height = this._height * zoom
    }
}