import { Web2D, Vector } from './index'

function createStage() {
    let div = document.createElement('div')
    div.style.width = '500px'
    div.style.height = '500px'
    document.body.append(div)
    return div
}

const stage = createStage()
const web2D = new Web2D(1)
stage.append(web2D.display)

setTimeout(() => {
    let renderer = web2D.getRenderer()
    console.info(renderer.renderingWidth, renderer.renderingHeight)
    renderer.clear('black')
    renderer.drawCircle(new Vector(100, 100), 30, 'red')
    renderer.drawPolygon([new Vector(30, 45), new Vector(96, 123), new Vector(183, 87)], 'green', 1, 'red')
}, 100);