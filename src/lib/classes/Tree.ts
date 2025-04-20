import { TreeNode } from "./TreeNode";

export class Tree {
    private _root: TreeNode

    constructor(root: string) {
        this._root = new TreeNode(root)
    }

    public get root(): TreeNode {
        return this._root
    }
    
    public set root(value: string) {
        this._root = new TreeNode(value)
    }

    public get empty(): boolean {
        return this._root === undefined ? true : false
    }
}