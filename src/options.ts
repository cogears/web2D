import Vector from "./math/Vector"

export interface LinearGradient {
    from: Vector,
    to: Vector,
    colorStop: Array<{ offset: number, color: string }>,
}

export interface Renderer {
    renderingWidth: number,
    renderingHeight: number,
    clear(backgroundFillStyle?: string | LinearGradient): void,
    fillRect(from: Vector, to: Vector, fillStyle: string | LinearGradient): void,
    drawPolyline(vertices: Vector[], lineWidth: number, lineColor: string, segments?: number[]): void,
    drawPolygon(vertices: Vector[], fillStyle?: string | LinearGradient, lineWidth?: number, lineColor?: string, segments?: number[]): void,
    drawArc(startRadian: number, endRadian: number, fillStyle?: string | LinearGradient, lineWidth?: number, lineColor?: string): void,
    drawArcs(radians: number[], colorSet: string[]): void,
    drawCircle(origin: Vector, radius: number, fillStyle?: string | LinearGradient, lineWidth?: number, lineColor?: string): void,
    drawCrossX(origin: Vector, lineWidth: number, lineColor: string, segments?: number[]): void,
    drawCrossY(origin: Vector, lineWidth: number, lineColor: string, segments?: number[]): void,
    drawText(origin: Vector, text: string, color: string, size: number, align?: CanvasTextAlign): void,
}