import Vector from "../math/Vector"
import { LinearGradient, Renderer } from "../options"

function createGradient(context: CanvasRenderingContext2D, fillStyle: LinearGradient) {
    let gradient = context.createLinearGradient(fillStyle.from.x, fillStyle.from.y, fillStyle.to.x, fillStyle.to.y)
    for (let item of fillStyle.colorStop) {
        gradient.addColorStop(item.offset, item.color)
    }
    return gradient
}

export default class CanvasRenderer implements Renderer {
    private readonly context: CanvasRenderingContext2D
    readonly renderingWidth: number
    readonly renderingHeight: number

    constructor(context: CanvasRenderingContext2D, width: number, height: number) {
        this.context = context
        this.renderingWidth = width
        this.renderingHeight = height
    }

    clear(backgroundFillStyle?: string | LinearGradient) {
        this.context.clearRect(0, 0, this.renderingWidth, this.renderingHeight)
        if (backgroundFillStyle) {
            this.fillRect(new Vector(0, 0), new Vector(this.renderingWidth, this.renderingHeight), backgroundFillStyle)
        }
    }

    fillRect(from: Vector, to: Vector, fillStyle: string | LinearGradient) {
        if (typeof fillStyle == 'string') {
            this.context.fillStyle = fillStyle
        } else {
            this.context.fillStyle = createGradient(this.context, fillStyle)
        }
        this.context.fillRect(from.x, from.y, to.x - from.x, to.y - from.y)
    }

    drawPolyline(vertices: Vector[], lineWidth: number, lineColor: string, segments?: number[]) {
        this.context.beginPath()
        this.context.moveTo(vertices[0].x, this.y(vertices[0].y))
        for (let i = 1; i < vertices.length; i++) {
            this.context.lineTo(vertices[i].x, this.y(vertices[i].y))
        }
        this.stroke(lineWidth, lineColor, segments)
        this.context.closePath()
    }

    drawPolygon(vertices: Vector[], fillStyle?: string | LinearGradient, lineWidth: number = 0, lineColor?: string, segments?: number[]) {
        this.context.beginPath()
        this.context.moveTo(vertices[0].x, vertices[0].y)
        for (let i = 1; i < vertices.length; i++) {
            this.context.lineTo(vertices[i].x, vertices[i].y)
        }
        this.context.lineTo(vertices[0].x, vertices[0].y)
        if (lineWidth > 0 && lineColor) {
            this.stroke(lineWidth, lineColor, segments)
        }
        if (fillStyle) {
            this.fill(fillStyle)
        }
        this.context.closePath()
    }

    drawArc(startRadian: number, endRadian: number, fillStyle?: string | LinearGradient, lineWidth: number = 0, lineColor?: string) {
        let x = this.renderingWidth / 2
        let y = this.renderingHeight / 2
        let radius = Math.min(this.renderingWidth, this.renderingHeight) / 2 - 4
        let offset = -Math.PI / 2
        this.context.beginPath()
        this.context.moveTo(x, y)
        this.context.arc(x, y, radius, offset + startRadian, offset + endRadian)
        this.context.lineTo(x, y)
        if (lineWidth > 0 && lineColor) {
            this.stroke(lineWidth, lineColor)
        }
        if (fillStyle) {
            this.fill(fillStyle)
        }
        this.context.closePath()
    }

    drawArcs(radians: number[], colorSet: string[]) {
        let x = this.renderingWidth / 2
        let y = this.renderingHeight / 2
        let radius = Math.min(this.renderingWidth, this.renderingHeight) / 2 - 4
        let offset = -Math.PI / 2
        for (let i = 0; i < radians.length; i++) {
            let start = i > 0 ? radians[i - 1] : 0
            let radian = radians[i]
            let color = colorSet[i]
            this.context.beginPath()
            this.context.arc(x, y, radius, offset + start, offset + radian)
            this.context.lineTo(x, y)
            this.context.fillStyle = color
            this.context.fill()
        }
    }

    drawCircle(origin: Vector, radius: number, fillStyle?: string | LinearGradient, lineWidth: number = 0, lineColor?: string) {
        this.context.beginPath()
        this.context.ellipse(origin.x, origin.y, radius, radius, 0, 0, 2 * Math.PI)
        if (lineWidth > 0 && lineColor) {
            this.stroke(lineWidth, lineColor)
        }
        if (fillStyle) {
            this.fill(fillStyle)
        }
        this.context.closePath()
    }

    drawCrossX(origin: Vector, lineWidth: number, lineColor: string, segments?: number[]) {
        if (origin.y <= 0) {
            origin.y = 0.5
        } else if (origin.y >= this.renderingHeight) {
            origin.y = this.renderingHeight - 0.5
        }
        this.context.beginPath()
        this.context.moveTo(0, origin.y)
        this.context.lineTo(this.renderingWidth, origin.y)
        this.stroke(lineWidth, lineColor, segments)
        this.context.closePath()
    }

    drawCrossY(origin: Vector, lineWidth: number, lineColor: string, segments?: number[]) {
        if (origin.x <= 0) {
            origin.x = 0.5
        } else if (origin.x >= this.renderingWidth) {
            origin.x = this.renderingWidth - 0.5
        }
        this.context.beginPath()
        this.context.moveTo(origin.x, 0)
        this.context.lineTo(origin.x, this.renderingHeight)
        this.stroke(lineWidth, lineColor, segments)
        this.context.closePath()
    }

    drawText(origin: Vector, text: string, color: string, size: number, align: CanvasTextAlign = 'center') {
        this.context.font = `${size}px sans-serif`
        this.context.fillStyle = color
        this.context.textAlign = align
        this.context.textBaseline = 'top'
        this.context.fillText(text, origin.x, origin.y)
    }

    private stroke(lineWidth: number, lineColor: string, segments?: number[]) {
        this.context.lineWidth = lineWidth
        this.context.strokeStyle = lineColor
        if (segments && segments.length > 0) {
            this.context.setLineDash(segments)
        } else {
            this.context.setLineDash([])
        }
        this.context.stroke()
    }

    private fill(fillStyle: string | LinearGradient) {
        if (typeof fillStyle == 'string') {
            this.context.fillStyle = fillStyle
        } else {
            this.context.fillStyle = createGradient(this.context, fillStyle)
        }
        this.context.fill()
    }

    private y(value: number) {
        if (value > this.renderingHeight + 0.5) {
            value = this.renderingHeight - 0.5
        }
        return value
    }
}