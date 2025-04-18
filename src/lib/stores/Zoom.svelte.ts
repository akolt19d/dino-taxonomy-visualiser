const ZOOM_VALUES = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5, 6, 7, 8]
let zoomIndex = $state(ZOOM_VALUES.indexOf(1))

export function getZoom() {
    return ZOOM_VALUES[zoomIndex]
}

export function increaseZoom(): void {
    if (zoomIndex < ZOOM_VALUES.length - 1)
        zoomIndex++
}

export function decreaseZoom(): void {
    if (zoomIndex > 0)
        zoomIndex--
}

export function resetZoom(): void {
    zoomIndex = ZOOM_VALUES.indexOf(1)
}

export function isMinZoom(): boolean {
    return zoomIndex === 0
}

export function isMaxZoom(): boolean {
    return zoomIndex === ZOOM_VALUES.length - 1
}