/*
* FUNCIONES TOOLTIP
*/

function setTooltipText(tooltip) { //Mouseenter
    tooltip.html('Pruebaaaaa doble prueba y hasta triple prueba');
}

function getInTooltip(tooltip) { //Mouseover
    tooltip.style('opacity', 1);
}

function getOutTooltip(tooltip) { //Mouseout
    tooltip.transition().duration(500).style('opacity', 0);
}

function positionTooltip(tooltip, div) {
    let coordinates = d3.mouse(div);

    let x = coordinates[0];
    let y = coordinates[1];
    let tooltipWidth = parseInt(tooltip.style('width'));
    let tooltipHeight = parseInt(tooltip.style('height'));
    
    //Posición
    let left = div.getBoundingClientRect().width / 2 > x ? 'right' : 'left';
    let horizontalPos = left == 'left' ? -tooltipWidth - 30 : 30;

    tooltip.style('top', y - (tooltipHeight + 15) + 'px');
    tooltip.style('left', x + horizontalPos + 'px');
}