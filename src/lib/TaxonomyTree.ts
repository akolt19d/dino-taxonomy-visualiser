import { Tree } from "./classes/Tree"

export function getTaxonomyTree(taxonomies: string[][]): Tree {
    let tree: Tree = new Tree("Dinosauria")
    taxonomies.forEach(taxonomy => {
        if (taxonomy.length === 0)
            return

        translateTaxonomy(taxonomy, tree)
    })

    return tree
}

function translateTaxonomy(taxonomy: string[], tree: Tree): void {
    let parentNode = tree.root
    taxonomy.forEach(tx => {
        let child = parentNode.getChild(tx)
        if (child)
            parentNode = child
        else 
            parentNode = parentNode.addChild(tx)
    })
}