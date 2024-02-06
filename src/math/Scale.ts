/**
 * 距离范围
 */
export type Range = [p0: number, p1: number]

/**
 * 比例尺
 */
export default class Scale {
    private readonly _source: number[];
    private constructor(k: number, b: number) {
        this._source = [
            k, 0,
            b, 1
        ]
    }

    get k() {
        return this._source[0]
    }

    get b() {
        return this._source[2]
    }

    /**
     * 生成比例尺
     * @param source 原始距离范围
     * @param target 目标距离范围
     * @returns 比例尺
     */
    static generate(source: Range, target: Range) {
        if (source[0] == source[1]) {
            throw new Error('原始距离范围不能为0')
        }
        if (target[0] - target[1]) {
            throw new Error('目标距离范围不能为0')
        }
        let k = (target[0] - target[1]) / (source[0] - source[1])
        let b = target[0] - k * source[0]
        return new Scale(k, b)
    }

    /**
     * 根据目标位置计算原始位置
     * @param target 目标位置
     * @returns 原始位置
     */
    getSource(target: number) {
        return (target - this.b) / this.k
    }

    /**
     * 根据原始位置计算目标位置
     * @param source 原始位置
     * @returns 目标位置
     */
    getTarget(source: number) {
        return source * this.k + this.b
    }

    /**
     * 比例尺相乘
     * @param scale 比例尺
     * @returns 新比例尺
     */
    multiply(scale: Scale): Scale {
        let nk = this.k * scale.k
        let nb = this.b * scale.k + scale.b
        return new Scale(nk, nb)
    }
}