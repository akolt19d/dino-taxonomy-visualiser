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

    public get children(): Set<string> {
        return new Set(this._childrenArr.map(c => c.value))
    }
    
    public get parent() : TreeNode | undefined {
        return this._parent
    }
    
    public get value(): string {
        return this._value
    }
    
    public addChild(child: string): TreeNode {
        let childNode = new TreeNode(child)
        this._children.add(childNode)
        return childNode
    }

    public removeChild(child: TreeNode): void {
        this._children.delete(child)
    }

    public hasChild(child: string): boolean {
        return this.children.has(child)
    }

    public getChild(child: string): TreeNode | undefined {
        return this._children.values().find(x => x.value === child)
    }
}