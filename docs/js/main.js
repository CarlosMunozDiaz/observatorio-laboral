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
        let margin = {top: 5, right: 5, bottom: 25, left: 25};
        let {width, height, chart} = setChart(chartBlock, margin);

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
        let lines = [
            {lineName: 'lineAE', xAxis: 'Fecha', yAxis: 'AE', cssLine: 'line-ae', cssCircle: 'circle-ae', cssColor: '#99E6FC', },
            {lineName: 'lineLAC', xAxis: 'Fecha', yAxis: 'LAC', cssLine: 'line-lac', cssCircle: 'circle-lac', cssColor: '#2347E3'},
            {lineName: 'lineEE', xAxis: 'Fecha', yAxis: 'EE', cssLine: 'line-ee', cssCircle: 'circle-ee', cssColor: '#081C29'}
        ]

        for(let i = 0; i < lines.length; i++) {
            let line = d3.line()
                .x(function(d) { return x(d[lines[i].xAxis]) + x.bandwidth() / 2; })
                .y(function(d) { return y(d[lines[i].yAxis]); });

            chart.append("path")
                .data([data])
                .attr("class", `line ${lines[i].cssLine}`)
                .attr("fill", "none")
                .attr("stroke", `${lines[i].cssColor}`)
                .attr("stroke-width", '1.5px')
                .attr("d", line);

            chart.selectAll('.circles')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', `${lines[i].cssCircle}`)
                .attr("r", 5)
                .attr("cx", function(d) { return x(d[lines[i].xAxis]) + x.bandwidth() / 2; })
                .attr("cy", function(d) { return y(d[lines[i].yAxis]); })
                .style("fill", '#000')
                .style('opacity', '0')
                .on('mouseenter', function(d, i, e) {
                    let css = e[i].getAttribute('class').split('-')[1];

                    let html = `<p class="chart__tooltip--title">Año: ${d.Fecha}</p>
                                <p class="chart__tooltip--text">Dato: ${d[css.toUpperCase()]}%</p>`; //Solucionar recogida de información
    
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
        }
    });
}

function getFifthChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-five');
    let tooltip = chartBlock.select('.chart__tooltip');

    //Lectura de datos
    let file = './data/chart-five.csv';
    d3.csv(file, function(d) {
        return {
            pais: d.Pais,
            porc_hombres: +d['Perdida_Hombres'].replace(/,/g, '.') * 100,
            porc_mujeres: +d['Perdida_Mujeres'].replace(/,/g, '.') * 100
        }
    }, function(error,data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 95, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Agrupación de datos para barras agrupadas
        //Agrupaciones de datos
        let paises = data.map(function(d){return d.pais});
        let columnas = ['Mujeres','Hombres'];
        let newData = [];
        for(let i = 0; i < data.length; i++){
            newData.push({categoria: data[i].pais, valores: [
                {descriptor: 'Mujeres', pais: data[i].pais, valor: data[i].porc_mujeres},
                {descriptor: 'Hombres', pais: data[i].pais, valor: data[i].porc_hombres}                                  
            ]})
        }

        //Eje X > Países y columnas
        let x0 = d3.scaleBand()
            .rangeRound([0,width])
            .domain(paises)
            .paddingInner(.5)
            .align(1);
        
        let x1 = d3.scaleBand()
            .range([x0.bandwidth(),0])
            .paddingInner(.25)
            .paddingOuter(.35)
            .domain(columnas);

        let xAxis = function(g){
            g.call(d3.axisBottom(x0))
            g.call(function(g){
                g.selectAll('.tick text')
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function(d) {
                    return "rotate(-65)" 
                    });
            })
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
        }

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        let y = d3.scaleLinear()
            .range([height, 0])
            .domain([-25,10]);
    
        let yAxis = function(g){
            g.call(d3.axisLeft(y).tickFormat(function(d) { return d + '%'; }))
            g.call(function(g){g.select('.domain').remove()})
            g.call(function(g){
                g.selectAll('.tick line')
                    .attr('class', function(d,i) {
                        if (d == 0) {
                            return 'line-special';
                        }
                    })
                    .attr('x1', '0%')
                    .attr('x2', `${width}`)
            });
        }

        chart.append("g")
            .call(yAxis);

        //Visualización de datos
        let slice = chart.selectAll(".slice")
            .data(newData)
            .enter()
            .append("g")
            .attr("class", "g")
            .attr("transform",function(d) { return "translate(" + x0(d.categoria) + ",0)"; });

        slice.selectAll("rect")
            .data(function(d) { return d.valores; })
            .enter()
            .append("rect")
            .attr("x", d => x1(d.descriptor))
            .attr("y", function(d) { return y(Math.max(0, d.valor)); })
            .attr("width", x1.bandwidth())
            .attr('height', d => Math.abs(y(d.valor) - y(0)))
            .attr('data-country', function(d,i) { return d.pais; })
            .attr('class', function(d,i) { 
                if(d.descriptor == 'Hombres') {
                    return 'rect rect-hombres';
                } else {
                    return 'rect rect-mujeres';
                }
             })
            .style('fill',function(d) {return d.descriptor == 'Hombres' ? '#081C29' : '#99E6FC'})
            .on('mouseenter', function(d, i, e) {
                let pais = e[i].getAttribute('data-country').replace(/\*/g, '');
                let css = e[i].getAttribute('class').split('-')[1];

                let html = `<p class="chart__tooltip--title">${pais}</p>
                            <p class="chart__tooltip--text">${css}: ${d.valor.toFixed(2)}%</p>`; //Solucionar recogida de información

                tooltip.html(html);

            })
            .on('mouseover mousemove', function(d, i, e) {
                //Posibilidad visualización línea diferente
                let rects = chartBlock.selectAll('.rect');
                let css = e[i].getAttribute('class').split('-')[1];

                rects.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`rect-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(tooltip, e[i], chartBlock);
                getInTooltip(tooltip);
            })
            .on('mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let rects = chartBlock.selectAll('.rect');
                rects.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            });
    });
}

function getFifteenChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-fifteen');
    let tooltip = chartBlock.select('.chart__tooltip');

    //Lectura de datos
    let file = './data/chart-fifteen.csv';
    d3.csv(file, function(d) {
        return {
            tipo: d.tipo,
            tipo_eje: d.tipo_eje,
            porcentaje: +d['porcentaje'].replace(/,/g, '.') * 100
        }
    }, function(error, data) {
        if (error) throw error;

        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 25, left: 135};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Disposición del eje X
        let x = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.porcentaje; }))
            .range([0, width])
            .nice();

        //Estilos para eje X
        let xAxis = function(g){
            g.call(d3.axisBottom(x).ticks(6).tickFormat(function(d) { return d + '%'; }))
            g.call(function(g){
                g.selectAll('.tick line')
                    .attr('class', function(d,i) {
                        if (d == 0) {
                            return 'line-special';
                        }
                    })
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
        let y = d3.scaleBand()
            .domain(data.map(function(d) { return d.tipo_eje; }))
            .range([height, 0]);

        let yAxis = function(svg){
            svg.call(d3.axisLeft(y))
            svg.call(function(g){g.selectAll('.tick line').remove()})
            svg.call(function(g){g.select('.domain').remove()})
        }        
        
        chart.append("g")
            .call(yAxis)
            .selectAll('.tick text')
            .call(wrap, 130);

        //Visualización de datos
        chart.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr('class', function(d, i) { return `bar bar-${i}`; })
            .style('fill', '#081C29')
            .attr("x", function (d) {
                return x(Math.min(0, d.porcentaje));
            })
            .attr("y", function (d) {
                return y(d.tipo_eje) + y.bandwidth() / 4;
            })
            .attr("width", function (d) {
                return Math.abs(x(d.porcentaje) - x(0));
            })
            .attr("height", y.bandwidth() / 2)
            
            .on('mouseenter', function(d, i, e) {
                let html = `<p class="chart__tooltip--title">${d.tipo}</p>
                            <p class="chart__tooltip--text">Porc.: ${d.porcentaje.toFixed(2)}%</p>`; //Solucionar recogida de información

                tooltip.html(html);
            })
            .on('mouseover mousemove', function(d, i, e) {
                //Posibilidad visualización línea diferente
                let bars = chartBlock.selectAll('.bar');
                let css = e[i].getAttribute('class').split('-')[1];

                bars.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`bar-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(tooltip, e[i], chartBlock);
                getInTooltip(tooltip);
            })
            .on('mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let bars = chartBlock.selectAll('.bar');
                bars.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            });
    });
}

getFirstChart();
getFifthChart();
getFifteenChart();




/* Visualization helpers */
function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1, // ems
            y = text.attr("y"),
            dy = words.length <= 3 ? parseFloat(text.attr("dy")) : 0,
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
};

/* Inicialización del gráfico */
function setChart(chartBlock, margin) {
    let width = parseInt(chartBlock.style('width')) - margin.left - margin.right,
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
