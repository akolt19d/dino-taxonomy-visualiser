let dinosaur: Dinosaur | undefined = $state(undefined)

export function getSelectedDinosaur(): Dinosaur | undefined {
    return dinosaur
}

export function setSelectedDinosaur(newDinosaur: Dinosaur | undefined): void {
    dinosaur = newDinosaur
}

export function clearSelectedDinosaur(): void {
    dinosaur = undefined
}