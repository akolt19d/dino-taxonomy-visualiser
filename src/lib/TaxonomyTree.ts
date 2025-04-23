import { Tree } from "./classes/Tree"

export function getTaxonomyTree(parseableArr: ParseableDinosaur[]): Tree {
    let tree: Tree = new Tree("Dinosauria")
    parseableArr.forEach(parseable => {
        translateTaxonomy(parseable.taxonomy, parseable.dinosaur, tree)
    })

    return tree
}

function translateTaxonomy(taxonomy: string[], dino: Dinosaur, tree: Tree): void {
    let parentNode = tree.root
    taxonomy.forEach(tx => {
        parentNode = parentNode.addChild(tx)
    })
    parentNode.addChild(dino.name, dino)
}