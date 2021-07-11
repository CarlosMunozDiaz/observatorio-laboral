/* Función asociada al primer gráfico */
function getFirstChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-one');
    let tooltip = chartBlock.select('.chart__tooltip');

    //Lectura de datos
    let file = './data/chart-one.csv';
    d3.csv(file, function(data) {
        return {
            Fecha: data.Year,
            AE: +data['Advanced Economies'].replace(/,/g, '.'),
            LAC: +data['LAC'].replace(/,/g, '.'),
            EE: +data['Emerging Economies'].replace(/,/g, '.')
        }
    }, function(error, d) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let {margin, width, height, chart} = setChart(chartBlock);

        //Disposición del eje X

        //Disposición del eje Y

    });
}

getFirstChart();

/* Visualization helpers */

/* Iniciaulización del gráfico */
function setChart(chartBlock) {
    let margin = {top: 5, right: 5, bottom: 205, left: 30},
    width = parseInt(chartBlock.style('width')) - margin.left - margin.right,
    height = parseInt(chartBlock.style('height')) - margin.top - margin.bottom;

    let chart = chartBlock
        .append('svg')
        .lower()
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    return {margin, width, height, chart};
}
