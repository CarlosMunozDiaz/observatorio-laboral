/* Función asociada al primer gráfico */
function getFirstChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-one');
    let tooltip = chartBlock.select('.chart__tooltip');

    //Lectura de datos
    let file = './data/chart-one.csv';
    d3.csv(file, function(d) {
        return {
            Fecha: d.Year,
            AE: +d['Advanced Economies'].replace(/,/g, '.'),
            LAC: +d['LAC'].replace(/,/g, '.'),
            EE: +d['Emerging Economies'].replace(/,/g, '.')
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let {margin, width, height, chart} = setChart(chartBlock);

        //Disposición del eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.Fecha }))
            .range([0, width]);

        //Estilos para eje X
        let xAxis = function(g){
            g.call(d3.axisBottom(x))
            g.call(function(g){
                g.selectAll('.tick line')
                    .attr('y1', '0%')
                    .attr('y2', '-100%')
            })
            g.call(function(g){g.select('.domain').remove()});
        }
        
        //Inicialización eje X
        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        //Disposición del eje Y
        let y = d3.scaleLinear()
            .domain([-10,10])
            .range([height,0]);
    
        let yAxis = function(svg){
            svg.call(d3.axisLeft(y))
            svg.call(function(g){
                g.selectAll('.tick line')
                    .attr('class', function(d,i) {
                        if (d == 0) {
                            return 'line-special';
                        }
                    })
                    .attr("x1", '0%')
                    .attr("x2", '100%')
            })
            svg.call(function(g){g.select('.domain').remove()})
        }        
        
        chart.append("g")
            .call(yAxis);
    });
}

getFirstChart();

/* Visualization helpers */

/* Iniciaulización del gráfico */
function setChart(chartBlock) {
    let margin = {top: 5, right: 5, bottom: 25, left: 30},
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

function setLinearScale() {

}

function setBandScale() {

}

function setXStyles() {

}

function setYStyles() {

}
