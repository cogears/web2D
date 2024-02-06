/**
 * 二维向量, 默认零向量
 */
export default class Vector {
    x: number = 0
    y: number = 0
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    /**
     * 向量的模
     */
    get length(): number {
        return Math.sqrt(this.length2)
    }

    /**
     * 向量的模平方
     */
    get length2(): number {
        return this.x * this.x + this.y * this.y
    }

    /**
     * 是否零向量
     */
    get isZero(): boolean {
        return this.x == 0 && this.y == 0
    }

    toString(): string {
        return `Vector[${this.x}, ${this.y}]`
    }

    clone(): Vector {
        return new Vector(this.x, this.y)
    }

    /**
     * 计算单位向量
     */
    normalize(): Vector {
        if (this.isZero) {
            throw new Error('零向量没有单位向量')
        }
        const length2 = this.length2
        if (length2 == 1) {
            return this.clone()
        } else {
            return this.scale(1 / Math.sqrt(length2))
        }
    }

    /**
     * 计算逆向量
     */
    inverse(): Vector {
        return new Vector(-this.x, -this.y)
    }

    /**
     * 缩放向量
     * @param n 缩放因子
     */
    scale(n: number) {
        if (this.isZero) {
            return new Vector();
        }
        return new Vector(this.x * n, this.y * n)
    }

    /**
     * 向量加
     * @param target 目标向量
     */
    add(target: Vector): Vector {
        return new Vector(this.x + target.x, this.y + target.y)
    }

    /**
     * 向量减
     * @param target 目标向量
     */
    sub(target: Vector): Vector {
        return new Vector(this.x - target.x, this.y - target.y)
    }

    /**
     * 向量点乘
     * @param target 目标向量
     */
    dot(target: Vector): number {
        if (this.isZero || target.isZero) {
            return 0
        }
        return this.x * target.x + this.y * target.y
    }

    /**
     * 余弦定理,计算向量夹角余弦值
     * @param target 目标向量
     */
    cos(target: Vector): number {
        if (this.isZero || target.isZero) {
            return 0
        }
        return this.dot(target) / (this.length * target.length)
    }
}