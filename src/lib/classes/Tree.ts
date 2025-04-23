import { TreeNode } from "./TreeNode";

export class Tree {
    private _root: TreeNode

    constructor(root: string | TreeNode) {
        if (typeof root === "string")
            this._root = new TreeNode(root)
        else
            this._root = root
    }

    public get root(): TreeNode {
        return this._root
    }
    
    public set root(root: string | TreeNode) {
        if (typeof root === "string")
            this._root = new TreeNode(root)
        else
            this._root = root
    }

    public* nodes(): Generator<TreeNode> {
        yield* this._root.nodes()
    }
}