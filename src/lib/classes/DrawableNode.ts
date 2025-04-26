import { clamp } from "$lib/Utils"
import type { Container } from "./Container"
import { TreeNode } from "./TreeNode"

function getColumnIndex(maxChildRow: number) {
    return (maxChildRow - 1)/2
}

export class DrawableNode extends TreeNode {
    private _width: number
    private _height: number 
    private _color: string
    private _container: Container

    public columnIndex: number = 0
    public rowIndex: number
    public width: number
    public height: number
    private x: number | undefined = undefined
    private y: number | undefined = undefined

    constructor(rowIndex: number, width: number, height: number, color: string, container: Container, value: string, parent?: TreeNode, dinoData?: Dinosaur) {
        super(value, parent, dinoData)

        this._width = width
        this._height = height
        this._color = color
        if (this.isDinosaur)
            this._color = "yellow"
        this._container = container

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

    public get maxChildRow(): number {
        // if(this.parent?.childrenSize === 1 && this.parent instanceof DrawableNode)
        //     return this.parent.columnIndex
        if(this.childrenSize === 0)
            return 0

        // let map = new Map<number, number>()
    
        // for (const child of this.nodes()) {
        //     if (child instanceof DrawableNode) {
        //         let set = map.get(child.rowIndex)
        //         if (set === undefined) {
        //             map.set(child.rowIndex, child.childrenSize)
        //         }
        //         else {
        //             map.set(child.rowIndex, set + child.childrenSize)
        //         }
        //     }
        // }
    
        // return Math.max(...map.values())

        let branches = 0
        for (const child of this.nodes()) {
            if (child.isDinosaur)
                branches++
        }

        return branches
    }

    public spaceChildren(globalOffset: number): void {
        if (this.childrenSize === 0) {
            // if (this.parent instanceof DrawableNode)
            //     this.columnIndex = this.parent.columnIndex

            return
        }

        if (this.maxChildRow === 1) {
            for (const child of this.children) {
                if (!(child instanceof DrawableNode))
                    continue

                child.columnIndex = this.columnIndex
                child.spaceChildren(globalOffset)
                return 
            }
        }

        if (this.isRoot)
            this.columnIndex = getColumnIndex(this.maxChildRow)

        let offset = 0
        this.children.forEach(child => {
            if (!(child instanceof DrawableNode))
                return

            let totalOffset = offset + globalOffset
            child.columnIndex = getColumnIndex(child.maxChildRow) + totalOffset
            offset += child.maxChildRow
            child.spaceChildren(totalOffset)
        })
    }
}