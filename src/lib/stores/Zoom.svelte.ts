const ZOOM_VALUES = [0.05, 0.1, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
let zoomIndex = $state(ZOOM_VALUES.indexOf(0.2))

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
    zoomIndex = ZOOM_VALUES.indexOf(0.5)
}

export function isMinZoom(): boolean {
    return zoomIndex === 0
}

export function isMaxZoom(): boolean {
    return zoomIndex === ZOOM_VALUES.length - 1
}