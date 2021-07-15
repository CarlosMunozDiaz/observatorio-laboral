/*
* FUNCIONES TOOLTIP
*/
function getInTooltip(tooltip) { //Mouseover
    tooltip.style('display','block').style('opacity', 1);
}

function getOutTooltip(tooltip) { //Mouseout
    tooltip.transition().duration(500).style('display','none').style('opacity', 0);
}

function positionTooltip(event, tooltip) {
    let x = event.pageX;
    let y = event.pageY;

    //Tamaño
    let ancho = parseInt(tooltip.style('width'));
    
    let distanciaAncho = isNaN(ancho) ? 100 : ancho;

    //Posición
    let left = window.innerWidth / 2 > x ? 'left' : 'right';
    let horizontalPos = left == 'left' ? 20 : - distanciaAncho + 20;

    tooltip.style('top', y + 20 + 'px');
    tooltip.style('left', (x + horizontalPos) + 'px');
}