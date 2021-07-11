let tooltip = d3.select('#chartTooltip');

function getInTooltip() {
    tooltip
        .transition()
        .duration(500)
        .style('opacity', 1);
}

function getOutTooltip() {
    tooltip
        .transition()
        .duration(500)
        .style('opacity', 0);
}

function positionTooltip() {
    
}