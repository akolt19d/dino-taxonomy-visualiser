import { Tree } from "./classes/Tree"
import type { TreeNode } from "./classes/TreeNode"

let depthMap: Map<number, Set<string>>

export function getTaxonomyTree(taxonomies: string[][]): Tree {
    let tree: Tree = new Tree("Dinosauria")
    taxonomies.forEach(taxonomy => {
        // console.log(taxonomy)
        if (taxonomy.length === 0)
            return

        translateTaxonomy(taxonomy, tree)
    })

    return tree
}

function translateTaxonomy(taxonomy: string[], tree: Tree): void {
    let parentNode = tree.root
    taxonomy.forEach(tx => {
        parentNode = parentNode.addChild(tx)
    })
    // console.log(parentNode, parentNode.childValues)
}

function depth(node: TreeNode, i?: number) {
    let index = i ? i : 0
    // console.log(node.value, index)

    let set = depthMap.get(index)

    if (set === undefined) {
        let row: Set<string> = new Set()
        row.add(node.value)
        depthMap.set(index, row)
    }
    else
        set.add(node.value)

    for (let child of node.children.values()) {
        depth(child, index+1)
    }
}

export function getTreeDepthMap(tree: Tree): Map<number, number> {
    let processedMap: Map<number, number> = new Map()

    depthMap = new Map()
    depth(tree.root)

    depthMap.forEach((v, k) => {
        processedMap.set(k, v.size)
    })

    return processedMap
}