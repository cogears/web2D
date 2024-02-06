import CanvasRenderer from "./CanvasRenderer";

function createContainer(position: 'relative' | 'absolute') {
    let div = document.createElement('div')
    div.style.position = position;
    div.style.left = '0'
    div.style.top = '0'
    div.style.width = '100%'
    div.style.height = '100%'
    return div
}

function createCanvas() {
    let canvas = document.createElement('canvas')
    canvas.style.position = 'absolute'
    canvas.style.display = 'block'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    return canvas
}


export default class CanvasContext {
    private readonly _container: HTMLDivElement
    private readonly _content: HTMLDivElement
    private readonly _decorator: HTMLDivElement
    private readonly _canvases: HTMLCanvasElement[] = []
    private readonly _contexts: CanvasRenderingContext2D[] = []
    private _width: number = 0
    private _height: number = 0

    constructor(layers: number) {
        this._container = createContainer('relative')
        this._content = createContainer('relative')
        this._decorator = createContainer('absolute')
        for (let i = 0; i < layers; i++) {
            let canvas = createCanvas()
            this._content.append(canvas)
            this._canvases.push(canvas)
            let context = canvas.getContext('2d')
            if (context) {
                this._contexts.push(context)
            }
        }
        this._content.append(this._decorator)
        this._container.append(this._content)
        if (this._contexts.length == 0) {
            throw new Error('initialize canvas 2d fault')
        }
    }

    get display() {
        return this._container
    }

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }

    generateRenderer(layer: number) {
        return new CanvasRenderer(this._contexts[layer], this.width, this.height)
    }

    resize() {
        let containerWidth = this._container.clientWidth
        let containerHeight = this._container.clientHeight
        let contentWidth = Math.floor(containerWidth)
        let contentHeight = Math.floor(containerHeight)
        this._width = contentWidth * window.devicePixelRatio
        this._height = contentHeight * window.devicePixelRatio
        this._content.style.width = contentWidth + 'px'
        this._content.style.height = contentHeight + 'px'
        for (let canvas of this._canvases) {
            canvas.width = this._width
            canvas.height = this._height
        }
    }

    clear(layer: number) {
        if (layer >= 0 && layer < this._contexts.length) {
            this._contexts[layer].clearRect(0, 0, this.width, this.height)
        } else {
            for (let context of this._contexts) {
                context.clearRect(0, 0, this.width, this.height)
            }
        }
        this._decorator.innerHTML = ''
    }

    dispose() {
        if (this._container.parentNode) {
            this._container.parentNode.removeChild(this._container)
        }
        this._canvases.splice(0, this._canvases.length)
        this._contexts.splice(0, this._contexts.length)
    }
}