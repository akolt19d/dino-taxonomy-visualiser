export class TreeNode {
    private _children: Set<TreeNode> = new Set()
    private _parent: TreeNode | undefined
    private _value: string
    private _dinosaurData: Dinosaur | undefined = undefined

    constructor(value: string, parent?: TreeNode, dinoData?: Dinosaur) {
        this._value = value
        this._parent = parent
        this._dinosaurData = dinoData
    }

    private get _childrenArr(): TreeNode[] {
        return Array.from(this._children)
    }

    public get dinosaurData(): Dinosaur | undefined {
        return this._dinosaurData
    }

    public set dinosaurData(dinoData: Dinosaur | undefined) {
        this._dinosaurData = dinoData
    }

    public get isDinosaur(): boolean {
        return this._dinosaurData !== undefined
    }

    public get isRoot(): boolean {
        return this._parent === undefined
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
    
    public addChild(child: string, dinoData?: Dinosaur): TreeNode {
        let childNode = new TreeNode(child, this, dinoData)

        if (this.hasChild(child))
            return this.getChild(child)!

        this._children.add(childNode)
        return childNode
    }

    public addChildNode(child: TreeNode): TreeNode {
        if (this.hasChild(child.value))
            return this.getChild(child.value)!

        this._children.add(child)
        return child
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

    public* nodes(): Generator<TreeNode> {
        yield this

        for (const child of this._children) {
            yield* child.nodes()
        }
    }
}