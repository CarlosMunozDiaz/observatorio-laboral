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
            .range([0, width])
            .paddingInner(0.15);

        //Estilos para eje X
        let xAxis = function(g){
            g.call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ return !(i%4)})))
            g.call(function(g){
                g.selectAll('.tick line')
                    .attr('y1', '0%')
                    .attr('y2', `-${height}`)
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
            .range([height,0])
            .nice();
    
        let yAxis = function(svg){
            svg.call(d3.axisLeft(y))
            svg.call(function(g){
                g.selectAll('.tick line')
                    .attr('class', function(d,i) {
                        if (d == 0) {
                            return 'line-special';
                        }
                    })
                    .attr("x1", `${x.bandwidth() / 2}`)
                    .attr("x2", `${width - x.bandwidth() / 2}`)
            })
            svg.call(function(g){g.select('.domain').remove()})
        }        
        
        chart.append("g")
            .call(yAxis);

        //Inicialización de líneas
        let lineAE = d3.line()
            .x(function(d) { return x(d.Fecha) + x.bandwidth() / 2; })
            .y(function(d) { return y(d.AE); });

        let lineLAC = d3.line()
            .x(function(d) { return x(d.Fecha) + x.bandwidth() / 2; })
            .y(function(d) { return y(d.LAC); });

        let lineEE = d3.line()
            .x(function(d) { return x(d.Fecha) + x.bandwidth() / 2; })
            .y(function(d) { return y(d.EE); });

        //Visualización
        chart.append("path")
            .data([data])
            .attr("class", "line line-ae")
            .attr("fill", "none")
            .attr("stroke", '#99E6FC')
            .attr("stroke-width", '1.5px')
            .attr("d", lineAE);

        chart.append("path")
            .data([data])
            .attr("class", "line line-lac")
            .attr("fill", "none")
            .attr("stroke", '#2347E3')
            .attr("stroke-width", '1.5px')
            .attr("d", lineLAC);

        chart.append("path")
            .data([data])
            .attr("class", "line line-ee")
            .attr("fill", "none")
            .attr("stroke", '#081C29')
            .attr("stroke-width", '1.5px')
            .attr("d", lineEE);

        //Pintado de círculos ocultos para tooltip
        chart.selectAll('.circles')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'circle-ae')
            .attr("r", 5)
            .attr("cx", function(d) { return x(d.Fecha) + x.bandwidth() / 2; })
            .attr("cy", function(d) { return y(d.AE); })
            .style("fill", '#000')
            .style('opacity', '0')
            .on('mouseenter', function(d, i, e) {
                let html = `<p class="chart__tooltip--title">Año ${d.Fecha}</p>
                            <p class="chart__tooltip--text">Economías avanzadas: ${d.AE}%</p>`;

                tooltip.html(html);
            })
            .on('mousemove', function(d, i, e) {
                //Posibilidad visualización línea diferente
                let lines = document.getElementsByClassName('line');
                let css = e[i].getAttribute('class').split('-')[1];

                for(let i = 0; i < lines.length; i++) {
                    lines[i].style.opacity = '0.4';
                    if(lines[i].getAttribute('class').indexOf(`line-${css}`) != -1) {
                        lines[i].style.opacity = '1';
                        lines[i].style.strokeWidth = '2.5px';
                    }
                }

                //Tooltip
                positionTooltip(tooltip, e[i], chartBlock);
                getInTooltip(tooltip);               
            })
            .on('mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let lines = document.getElementsByClassName('line');
                for(let i = 0; i < lines.length; i++) {
                    lines[i].style.opacity = '1';
                    lines[i].style.strokeWidth = '1.5px';
                }

                //Quitamos el tooltip
                getOutTooltip(tooltip);                
            });

        chart.selectAll('.circles')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'circle-lac')
            .attr("r", 5)
            .attr("cx", function(d) { return x(d.Fecha) + x.bandwidth() / 2; })
            .attr("cy", function(d) { return y(d.LAC); })
            .style("fill", '#000')
            .style('opacity', '0')
            .on('mouseenter', function(d, i, e) {
                let html = `<p class="chart__tooltip--title">Año ${d.Fecha}</p>
                            <p class="chart__tooltip--text">Economías avanzadas: ${d.LAC}%</p>`;

                tooltip.html(html);
            })
            .on('mousemove', function(d, i, e) {
                //Posibilidad visualización línea diferente
                let lines = document.getElementsByClassName('line');
                let css = e[i].getAttribute('class').split('-')[1];

                for(let i = 0; i < lines.length; i++) {
                    lines[i].style.opacity = '0.4';
                    if(lines[i].getAttribute('class').indexOf(`line-${css}`) != -1) {
                        lines[i].style.opacity = '1';
                        lines[i].style.strokeWidth = '2.5px';
                    }
                }

                //Tooltip
                positionTooltip(tooltip, e[i], chartBlock);
                getInTooltip(tooltip);               
            })
            .on('mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let lines = document.getElementsByClassName('line');
                for(let i = 0; i < lines.length; i++) {
                    lines[i].style.opacity = '1';
                    lines[i].style.strokeWidth = '1.5px';
                }

                //Quitamos el tooltip
                getOutTooltip(tooltip);                
            });

        chart.selectAll('.circles')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'circle-ee')
            .attr("r", 5)
            .attr("cx", function(d) { return x(d.Fecha) + x.bandwidth() / 2; })
            .attr("cy", function(d) { return y(d.EE); })
            .style("fill", '#000')
            .style('opacity', '0')
            .on('mouseenter', function(d, i, e) {
                let html = `<p class="chart__tooltip--title">Año ${d.Fecha}</p>
                            <p class="chart__tooltip--text">Economías avanzadas: ${d.EE}%</p>`;

                tooltip.html(html);
            })
            .on('mousemove', function(d, i, e) {
                //Posibilidad visualización línea diferente
                let lines = document.getElementsByClassName('line');
                let css = e[i].getAttribute('class').split('-')[1];

                for(let i = 0; i < lines.length; i++) {
                    lines[i].style.opacity = '0.4';
                    if(lines[i].getAttribute('class').indexOf(`line-${css}`) != -1) {
                        lines[i].style.opacity = '1';
                        lines[i].style.strokeWidth = '2.5px';
                    }
                }

                //Tooltip
                positionTooltip(tooltip, e[i], chartBlock);
                getInTooltip(tooltip);               
            })
            .on('mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let lines = document.getElementsByClassName('line');
                for(let i = 0; i < lines.length; i++) {
                    lines[i].style.opacity = '1';
                    lines[i].style.strokeWidth = '1.5px';
                }

                //Quitamos el tooltip
                getOutTooltip(tooltip);                
            });
    });
}

getFirstChart();

/* Visualization helpers */

/* Inicialización del gráfico */
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
