export class TreeNode {
    private _children: Set<TreeNode> = new Set()
    private _parent: TreeNode | undefined
    private _value: string

    constructor(value: string, parent?: TreeNode) {
        this._value = value
        this._parent = parent
    }

    private get _childrenArr(): TreeNode[] {
        return Array.from(this._children)
    }

    public get children(): Set<TreeNode> {
        return this._children
    }

    public get childValues(): Set<string> {
        return new Set(this._childrenArr.map(c => c.value))
    }
    
    public get parent() : TreeNode | undefined {
        return this._parent
    }
    
    public get value(): string {
        return this._value
    }
    
    public addChild(child: string): TreeNode {
        // make it so it works on nodes as well
        let childNode = new TreeNode(child, this)

        if (this.hasChild(child))
            return this.getChild(child)!

        this._children.add(childNode)
        return childNode
    }

    public removeChild(child: TreeNode): void {
        this._children.delete(child)
    }

    public hasChild(child: string): boolean {
        return this.childValues.has(child)
    }

    public get childrenSize(): number {
        return this._children.size
    }

    public getChild(child: string): TreeNode | undefined {
        if (this.childrenSize === 0)
            return undefined

        return this._childrenArr.find(x => x.value === child)
    }
}