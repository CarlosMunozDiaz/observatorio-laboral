/*
* FUNCIONES TOOLTIP
*/
function getInTooltip(tooltip) { //Mouseover
    tooltip.style('display','block').style('opacity', 1);
}

function getOutTooltip(tooltip) { //Mouseout
    tooltip.transition().duration(500).style('display','none').style('opacity', 0);
}

function positionTooltip(tooltip, el, div) {
    let coordinates = d3.mouse(el);

    let x = coordinates[0];
    let y = coordinates[1];
    
    let tooltipWidth = parseInt(tooltip.style('width'));
    let tooltipHeight = parseInt(tooltip.style('height'));
    
    //Posición
    let left = parseInt(div.style('width')) / 2 > x ? 'right' : 'left';
    let horizontalPos = left == 'left' ? -25 : 25;

    tooltip.style('top', y - (tooltipHeight + 20) + 'px');
    tooltip.style('left', (x + horizontalPos) + 'px');
}