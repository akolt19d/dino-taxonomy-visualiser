enum MOUSE_MODE {
    SELECT = 'select',
    MOVE = 'move',
}

let mouseMode = $state(MOUSE_MODE.MOVE)

export function isSelectMode(): boolean {
    return mouseMode === MOUSE_MODE.SELECT
}

export function isMoveMode(): boolean {
    return mouseMode === MOUSE_MODE.MOVE
}

export function setSelectMode(): void {
    mouseMode = MOUSE_MODE.SELECT
}

export function setMoveMode(): void {
    mouseMode = MOUSE_MODE.MOVE
}