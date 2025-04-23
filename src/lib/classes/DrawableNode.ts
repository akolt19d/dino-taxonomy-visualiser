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
    private x: number | undefined = undefined
    private y: number | undefined = undefined

    constructor(columnIndex: number, rowIndex: number, width: number, height: number, color: string, container: Container, value: string, parent?: TreeNode, dinoData?: Dinosaur) {
        super(value, parent, dinoData)

        this._width = width
        this._height = height
        this._color = color
        if (this.isDinosaur)
            this._color = "yellow"
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

    public setPosition(x: number, y: number): void {
        this.x = x
        this.y = y
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (this.x === undefined || this.y === undefined)
            return

        ctx.fillStyle = this._color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = "white"
        ctx.lineWidth = 5
        // ctx.strokeRect(this.x, this.y, this.width, this.height)
    }

    public get topAnchor(): Coordinates | undefined {
        if (this.x === undefined || this.y === undefined) {
            console.warn("x and y must be defined before accessing topAnchor")
            return
        }

        return {
            x: this.x + (this.width / 2),
            y: this.y
        }
    }

    public get bottomAnchor(): Coordinates | undefined {
        if (this.x === undefined || this.y === undefined) {
            console.warn("x and y must be defined before accessing bottomAnchor")
            return
        }

        return {
            x: this.x + (this.width / 2),
            y: this.y + this.height
        }
    }
}