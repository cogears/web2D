import CanvasContext from "./render/CanvasContext"

export default class Web2D {
    private _render: CanvasContext
    private _resizeObserver: ResizeObserver

    constructor(layers: number = 2) {
        this._render = new CanvasContext(layers)
        this._resizeObserver = new ResizeObserver(this.resize.bind(this))
        this._resizeObserver.observe(this._render.display)
    }

    get display() {
        return this._render.display
    }

    get displayWidth() {
        return this._render.width
    }

    get displayHeight() {
        return this._render.height
    }

    getRenderer(layer: number = 0) {
        return this._render.generateRenderer(layer)
    }

    resize() {
        this._render.resize()
    }

    clear(layer: number = -1) {
        this._render.clear(layer)
    }

    dispose() {
        this._render.dispose()
        this._resizeObserver.disconnect()
    }
}