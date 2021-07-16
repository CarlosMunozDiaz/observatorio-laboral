let tooltip = d3.select('#chartTooltip');

function getFirstChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-one');

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
        let margin = {top: 5, right: 5, bottom: 25, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Disposición del eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.Fecha }))
            .range([0, width])
            .paddingInner(0.25);

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
            svg.call(d3.axisLeft(y).tickFormat(function(d) { return d + '%'; }))
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
            {lineName: 'lineAE', xAxis: 'Fecha', yAxis: 'AE', cssLine: 'line-AE', cssCircle: 'circle-AE', cssColor: '#99E6FC', },
            {lineName: 'lineLAC', xAxis: 'Fecha', yAxis: 'LAC', cssLine: 'line-LAC', cssCircle: 'circle-LAC', cssColor: '#2347E3'},
            {lineName: 'lineEE', xAxis: 'Fecha', yAxis: 'EE', cssLine: 'line-EE', cssCircle: 'circle-EE', cssColor: '#081C29'}
        ]

        setMultipleLines(chartBlock, chart, data, 'percentage', lines, x, y, tooltip);
    });
}

function getSecondChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-two');

    //Lectura de datos
    let file = './data/chart-two.csv';
    d3.csv(file, function(d) {
        return {
            Fecha: d.Fecha,
            Fecha_eje: d.Fecha_eje,
            Empleo_total: +d.Empleo_Total.replace(/,/g, '.') * 100,
            Empleo_formal: +d.Empleo_Formal.replace(/,/g, '.') * 100,
            Empleo_informal: +d.Empleo_Informal.replace(/,/g, '.') * 100
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 25, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Disposición del eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.Fecha_eje }))
            .range([0, width])
            .paddingInner(0.9);

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
            .domain([-20,0])
            .range([height,0])
            .nice();
    
        let yAxis = function(svg){
            svg.call(d3.axisLeft(y).tickFormat(function(d) { return d + '%'; }))
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
            {lineName: 'lineEmpleo_total', xAxis: 'Fecha_eje', yAxis: 'Empleo_total', cssLine: 'line-Empleo_total', cssCircle: 'circle-Empleo_total', cssColor: '#99E6FC', },
            {lineName: 'lineEmpleo_formal', xAxis: 'Fecha_eje', yAxis: 'Empleo_formal', cssLine: 'line-Empleo_formal', cssCircle: 'circle-Empleo_formal', cssColor: '#2347E3'},
            {lineName: 'lineEmpleo_informal', xAxis: 'Fecha_eje', yAxis: 'Empleo_informal', cssLine: 'line-Empleo_informal', cssCircle: 'circle-Empleo_informal', cssColor: '#081C29'}
        ]

        setMultipleLines(chartBlock, chart, data, 'percentage', lines, x, y, tooltip);
    });
}

function getSecondBisChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-two_bis');

    //Lectura de datos
    let file = './data/chart-two_bis.csv';
    d3.csv(file, function(d) {
        return {
            Fecha: d.Fecha,
            Fecha_eje: d.Fecha_eje,
            Empleo_formal: +d.Empleo_Formal.replace(/,/g, '.'),
            Empleo_informal: +d.Empleo_Informal.replace(/,/g, '.')
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 25, left: 40};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Disposición del eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.Fecha_eje }))
            .range([0, width])
            .paddingInner(1);

        //Estilos para eje X
        let xAxis = function(g){
            g.call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ return !(i%4)})))
            g.call(function(g){
                g.selectAll('.tick line')
                    .attr('y1', '-12px')
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
            .domain([-25000000,0])
            .range([height,0])
            .nice();
    
        let yAxis = function(svg){
            svg.call(d3.axisLeft(y).ticks(8, 's'))
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
            {lineName: 'lineEmpleo_formal', xAxis: 'Fecha_eje', yAxis: 'Empleo_formal', cssLine: 'line-Empleo_formal', cssCircle: 'circle-Empleo_formal', cssColor: '#2347E3'},
            {lineName: 'lineEmpleo_informal', xAxis: 'Fecha_eje', yAxis: 'Empleo_informal', cssLine: 'line-Empleo_informal', cssCircle: 'circle-Empleo_informal', cssColor: '#081C29'}
        ]

        setMultipleLines(chartBlock, chart, data, 'absolute', lines, x, y, tooltip);
    });
}

function getThirdChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-three');

    //Lectura de datos
    let file = './data/chart-three.csv';
    d3.csv(file, function(d) {
        return {
            pais: d.Pais,
            Empleo_total: +d.Empleo_Total.replace(/,/g, '.').replace('%',''),
            Empleo_formal: +d.Empleo_Formal.replace(/,/g, '.').replace('%',''),
            Empleo_informal: +d.Empleo_Informal.replace(/,/g, '.').replace('%','')
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 115, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.pais; }))
            .range([0, width]);

        let xAxis = function(g){
            g.call(d3.axisBottom(x))
            g.call(function(g){g.selectAll('.tick line').remove()})
            g.call(function(g){g.select('.domain').remove()})
            g.call(function(g){
                g.selectAll('.tick text')
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d) {
                        return "rotate(-65)" 
                    });
            });            
        }        
        
        chart.append("g")
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)

        //Eje Y
        let y = d3.scaleLinear()
            .domain([-20,10])
            .range([height, 0])
            .nice();
        
        let yAxis = svg => svg
            .call(d3.axisLeft(y).ticks(4).tickFormat(function(d) { return d + '%'; }))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line')
                .attr("class", function(d) { if (d == 0) { return 'line-special'; }})
                .attr("x1", `0`)
                .attr("x2", `${width}`)
            );

        chart.append('g')
            .call(yAxis);

        //Primera visualización de datos
        let tipoGenerico = 'Empleo_total';
        initChart(tipoGenerico);

        //Actualización
        document.getElementById('empleoThree').addEventListener('change', function(e) {
            tipoGenerico = e.target.value;
            updateChart(tipoGenerico);
        });

        //Funciones internas
        function initChart(tipo) {
            chart.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr('class', function(d, i) { return `bar bar-${i}`; })
                .style('fill', '#081C29')
                .attr('x', function(d) { return x(d.pais) + x.bandwidth() / 4; })
                .attr('width', x.bandwidth() / 2)
                .attr("y", function(d) { return y(0); })
                .on('touchstart touchmove mouseover mousemove', function(d, i, e) {
                    let css = e[i].getAttribute('class').split('-')[1];
                    
                    //Texto
                    let html = `<p class="chart__tooltip--title">${d.pais}</p>
                                <p class="chart__tooltip--text">${tipoGenerico.replace('_', ' ')}: ${numberWithCommas(d[tipoGenerico].toFixed(2))}%</p>`; //Solucionar recogida de información
                
                    tooltip.html(html);

                    //Posibilidad visualización línea diferente
                    let bars = chartBlock.selectAll('.bar');                    
                
                    bars.each(function() {
                        this.style.opacity = '0.4';
                        let split = this.getAttribute('class').split(" ")[1];
                        if(split == `bar-${css}`) {
                            this.style.opacity = '1';
                        }
                    });
                
                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('touchend mouseout', function(d, i, e) {
                    //Quitamos los estilos de la línea
                    let bars = chartBlock.selectAll('.bar');
                    bars.each(function() {
                        this.style.opacity = '1';
                    });
                
                    //Quitamos el tooltip
                    getOutTooltip(tooltip); 
                })
                .transition()
                .duration(3000)
                .attr("y", function(d) { return y(Math.max(0, d[tipo])); })     
                .attr('height', d => Math.abs(y(d[tipo]) - y(0)));
        }

        function updateChart(tipo) {
            chart
                .selectAll(".bar")
                .data(data)
                .transition()
                .duration(1500)
                .attr("y", function(d) { return y(Math.max(0, d[tipo])); })     
                .attr('height', d => Math.abs(y(d[tipo]) - y(0)));
        }
    });
}

function getFourthChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-four');

    //Lectura de datos
    let file = './data/chart-four.csv';
    d3.csv(file, function(d) {
        return {
            Fecha: d.Fecha,
            Fecha_eje: d.Fecha_eje,
            Hombres: +d.Hombres.replace(/,/g, '.') * 100,
            Mujeres: +d.Mujeres.replace(/,/g, '.') * 100
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 25, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Disposición del eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.Fecha_eje }))
            .range([0, width])
            .paddingInner(0.9);

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
            .domain([-20,0])
            .range([height,0])
            .nice();
    
        let yAxis = function(svg){
            svg.call(d3.axisLeft(y).tickFormat(function(d) { return d + '%'; }))
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
            {lineName: 'lineHombres', xAxis: 'Fecha_eje', yAxis: 'Hombres', cssLine: 'line-Hombres', cssCircle: 'circle-Hombres', cssColor: '#081C29'},
            {lineName: 'lineMujeres', xAxis: 'Fecha_eje', yAxis: 'Mujeres', cssLine: 'line-Mujeres', cssCircle: 'circle-Mujeres', cssColor: '#99E6FC'}
        ]

        setMultipleLines(chartBlock, chart, data, 'percentage', lines, x, y, tooltip);
    });
}

function getFourthBisChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-four_bis');

    //Lectura de datos
    let file = './data/chart-four_bis.csv';
    d3.csv(file, function(d) {
        return {
            Fecha: d.Fecha,
            Fecha_eje: d.Fecha_eje,
            Hombres: +d.Hombres.replace(/,/g, '.'),
            Mujeres: +d.Mujeres.replace(/,/g, '.')
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 25, left: 40};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Disposición del eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.Fecha_eje }))
            .range([0, width])
            .paddingInner(1);

        //Estilos para eje X
        let xAxis = function(g){
            g.call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ return !(i%4)})))
            g.call(function(g){
                g.selectAll('.tick line')
                    .attr('y1', '-0px')
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
            .domain([-18000000,0])
            .range([height,0])
            .nice();
    
        let yAxis = function(svg){
            svg.call(d3.axisLeft(y).ticks(6, 's'))
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
            {lineName: 'lineHombres', xAxis: 'Fecha_eje', yAxis: 'Hombres', cssLine: 'line-Hombres', cssCircle: 'circle-Hombres', cssColor: '#081C29'},
            {lineName: 'lineMujeres', xAxis: 'Fecha_eje', yAxis: 'Mujeres', cssLine: 'line-Mujeres', cssCircle: 'circle-Mujeres', cssColor: '#99E6FC'}
        ]

        setMultipleLines(chartBlock, chart, data, 'absolute', lines, x, y, tooltip);
    });
}

function getFifthChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-five');

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
            .paddingInner(0.5)
            .align(1);
        
        let x1 = d3.scaleBand()
            .range([x0.bandwidth(),0])
            .paddingInner(0)
            .paddingOuter(0)
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
            .attr("x", d => x1(d.descriptor) - x0.bandwidth() / 4)
            .attr("y", function(d) { return y(0); })
            .attr('class', function(d,i) { 
                if(d.descriptor == 'Hombres') {
                    return 'rect rect-Hombres';
                } else {
                    return 'rect rect-Mujeres';
                }
            })
            .attr("width", x1.bandwidth())            
            .attr('data-country', function(d,i) { return d.pais; })
            .style('fill',function(d) {return d.descriptor == 'Hombres' ? '#081C29' : '#99E6FC'})
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let pais = e[i].getAttribute('data-country').replace(/\*/g, '');
                let css = e[i].getAttribute('class').split('-')[1];

                let html = `<p class="chart__tooltip--title">${pais}</p>
                            <p class="chart__tooltip--text">${css}: ${numberWithCommas(d.valor.toFixed(2))}%</p>`; //Solucionar recogida de información
            
                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let rects = chartBlock.selectAll('.rect');

                rects.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`rect-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let rects = chartBlock.selectAll('.rect');
                rects.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.valor)); })     
            .attr('height', d => Math.abs(y(d.valor) - y(0)));           
    });
}

function getFifthBisChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-five_bis');

    //Lectura de datos
    let file = './data/chart-five_bis.csv';
    d3.csv(file, function(d) {
        return {
            pais: d.Pais,
            dato_diferencia: +d.Diferencia.replace(/,/g, '.') * 100,
            dato_perdidaEmpleo: +d.Empleo_total.replace(/,/g, '.') * 100
        }
    }, function(error,data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 60, left: 45};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Eje X
        let x = d3.scaleLinear()
            .domain([-8, 4])
            .range([0,width])
            .nice();

        let xAxis = svg => svg
            .call(d3.axisBottom(x).ticks(8))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line')
                .attr("class", (d) => { if (d == 0) { return 'line-special'; } })
                .attr("y1", '0%')
                .attr("y2", `-${height}`)
            );

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        chart.append("text")
            .style('font-size', '14px')
            .attr("text-anchor", "end")
            .attr("y", '95%')
            .attr("x", ((width / 2) + 23))
            .text("Diferencia")

        //Eje Y
        let y = d3.scaleLinear()
            .domain([-20,10])
            .range([height, 0])
            .nice();
        
        let yAxis = svg => svg
            .call(d3.axisLeft(y).ticks(4))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line')
                .attr("class", function(d) { if (d == 0) { return 'line-special'; }})
                .attr("x1", `0`)
                .attr("x2", `${width}`)
            );

        chart.append('g')
            .call(yAxis);

        chart.append("text")
            .style('font-size', '14px')
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 15)
            .attr("x", -((height / 2) - 34))
            .text("Empleo total")

        //Dibujo del gráfico
        chart.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'circle-scatterplot')
            .style('opacity', '1')
            .style('fill', function(d) { if (d.pais == 'Total') { return '#99E6FC'; } else { return '#081C29'; }} )
            .attr('r', 6)            
            .attr('cx', (d) => {return x(d.dato_diferencia)})
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                //Texto
                let html = `<p class="chart__tooltip--title">${d.pais}</p>
                            <p class="chart__tooltip--text">Pérdida de empleo: ${numberWithCommas(d.dato_perdidaEmpleo.toFixed(2))}%</p>
                            <p class="chart__tooltip--text">Diferencia entre hombres y mujeres: ${numberWithCommas(d.dato_diferencia.toFixed(2))}%</p>`; //Solucionar recogida de información

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let bars = chartBlock.selectAll('.circle-scatterplot');

                bars.each(function() {
                    this.style.opacity = '0.4';
                });
                this.style.opacity = '1';

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let bars = chartBlock.selectAll('.circle-scatterplot');
                bars.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .ease(d3.easeBounce)
            .duration(1750)
            .attr('cy', (d) => {return y(d.dato_perdidaEmpleo)})
            .delay((d,i) => {return i * 150});         

    });
}

function getSixthChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-six');

    //Lectura de datos
    let file = './data/chart-six.csv';
    d3.csv(file, function(d) {
        return {
            Edad: d['Edad'],
            Edad_eje: d['Edad_eje'],
            Hombres_total: +d['Hombres_total'].replace(/,/g, '.') * 100,
            Mujeres_total: +d['Mujeres_total'].replace(/,/g, '.') * 100,
            Hombres_formal: +d['Hombres_formal'].replace(/,/g, '.') * 100,
            Mujeres_formal: +d['Mujeres_formal'].replace(/,/g, '.') * 100,
            Hombres_informal: +d['Hombres_informal'].replace(/,/g, '.') * 100,
            Mujeres_informal: +d['Mujeres_informal'].replace(/,/g, '.') * 100
        }
    }, function (error, data) {
        if (error) throw data;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 25, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Agrupación de datos para barras agrupadas
        let edades = data.map(function(d){return d.Edad_eje});
        let columnas = ['Mujeres','Hombres'];
        let newData = [];
        for(let i = 0; i < data.length; i++){
            newData.push({categoria: data[i].Edad_eje, valores: [
                {descriptor: 'Mujeres', edad: data[i].Edad_eje, valor: [data[i].Mujeres_total, data[i].Mujeres_formal, data[i].Mujeres_informal] },
                {descriptor: 'Hombres', edad: data[i].Edad_eje, valor: [data[i].Hombres_total, data[i].Hombres_formal, data[i].Hombres_informal]}                                  
            ]});
        }

        //Eje X > Edades y columnas
        let x0 = d3.scaleBand()
            .rangeRound([0,width])
            .domain(edades);
        
        let x1 = d3.scaleBand()
            .range([x0.bandwidth(),0])
            .paddingOuter(0.5)
            .domain(columnas);

        let xAxis = function(g){
            g.call(d3.axisBottom(x0))
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
        }

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        let y = d3.scaleLinear()
            .range([height, 0])
            .domain([-30,0])
            .nice();
    
        let yAxis = function(g){
            g.call(d3.axisLeft(y).ticks(5).tickFormat(function(d) { return d + '%'; }))
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
            .attr("y", function(d) { return y(0); })
            .attr('class', function(d,i) { 
                if(d.descriptor == 'Hombres') {
                    return 'rect rect-Hombres';
                } else {
                    return 'rect rect-Mujeres';
                }
            })
            .attr("width", x1.bandwidth() / 2)            
            .attr('data-edad', function(d,i) { return d.edad; })
            .style('fill',function(d) {return d.descriptor == 'Hombres' ? '#081C29' : '#99E6FC'})
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let css = e[i].getAttribute('class').split('-')[1];

                //Texto
                let edad = e[i].getAttribute('data-edad');               
                let tipoEmpleo = currentIndex == 0 ? 'Empleo total' : currentIndex == 1 ? 'Empleo formal' : 'Empleo informal';

                let html = `<p class="chart__tooltip--title">${css} (${edad})</p>
                            <p class="chart__tooltip--text">${tipoEmpleo}: ${numberWithCommas(d.valor[currentIndex].toFixed(2))}%</p>`;

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let rects = chartBlock.selectAll('.rect');

                rects.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`rect-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let rects = chartBlock.selectAll('.rect');
                rects.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.valor[0])); })     
            .attr('height', d => Math.abs(y(d.valor[0]) - y(0)));
        
        let currentIndex = 0;

        function updateChart(idx) {
            slice
            .selectAll(".rect")
            .data(function(d) { return d.valores; })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.valor[idx])); })     
            .attr('height', d => Math.abs(y(d.valor[idx]) - y(0)));
        }

        document.getElementById('empleoSix').addEventListener('change', function(e) {
            let idx = e.target.value;
            currentIndex = +idx;
            updateChart(idx);
        });
    });
}

function getSeventhChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-seven');
    let switchState = false;

    //Lectura de datos
    let file = './data/chart-seven.csv';
    d3.csv(file, function(d) {
        return {
            Pais: d.Pais,
            Edad: d.Edad,
            Hombres: +d.Hombres_total.replace(/,/g, '.') * 100,
            Mujeres: +d.Mujeres_total.replace(/,/g, '.') * 100
        }
    }, function(error, data) {
        if (error) throw error;

        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 95, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Agrupación de datos para barras agrupadas
        let paises = d3.nest()
            .key(function(d) { return d.Pais; })
            .entries(data);

        let ejePaises = paises.map(function(d) { return d.key; });
        let columnas = ['[14,24]', '[25,34]', '[35,55]', '[56,70]'];
        
        //Eje X > Países y columnas
        let x0 = d3.scaleBand()
            .rangeRound([0,width])
            .domain(ejePaises);
        
        let x1 = d3.scaleBand()
            .range([0, x0.bandwidth()])
            .paddingInner(0.25)
            .paddingOuter(0.5)
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
            .domain([-40,10]);
    
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

        let slice = chart.selectAll(".slice")
            .data(paises)
            .enter()
            .append("g")
            .attr("class", "g")
            .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)"; });

        slice.selectAll("rect")
            .data(function(d) { return d.values; })
            .enter()
            .append("rect")
            .attr("x", function(d) { return x1(d.Edad) })
            .attr("y", function(d) { return y(0); })
            .attr('class', function(d,i) {
                if(d.Edad == '[14-24]') {
                    return 'rect rect-primero';
                } else if (d.Edad == '[25,34]') {
                    return 'rect rect-segundo';
                } else if (d.Edad == '[35,55]') {
                    return 'rect rect-tercero';
                } else {
                    return 'rect rect-cuarto';
                }
            })
            .attr("width", x1.bandwidth())            
            .attr('data-edad', function(d,i) { return d.Edad.replace(/[\[\]]/g, '').replace(',', '-'); })
            .style('fill',function(d) { return d.Edad == '[14,24]' ? '#99E6FC' : d.Edad == '[25,34]' ? '#2347E3' : d.Edad == '[35,55]' ? '#081C29' : '#474b4e'})
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let css = e[i].getAttribute('class').split('-')[1];

                //Texto
                let genero = switchState == true ? 'Mujeres' : 'Hombres';
                let edad = e[i].getAttribute('data-edad');

                let html = `<p class="chart__tooltip--title">${d.Pais} (${genero} - Edad: ${edad})</p>
                            <p class="chart__tooltip--text">${numberWithCommas(d[genero].toFixed(2))}%</p>`;

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let rects = chartBlock.selectAll('.rect');

                rects.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`rect-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let rects = chartBlock.selectAll('.rect');
                rects.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.Hombres)); })     
            .attr('height', d => Math.abs(y(d.Hombres) - y(0)));
        
        function updateChart(tipo) {
            slice
                .selectAll(".rect")
                .data(function(d) { return d.values; })
                .transition()
                .duration(1500) 
                .attr("y", function(d) { return y(Math.max(0, d[tipo])); })     
                .attr('height', d => Math.abs(y(d[tipo]) - y(0)));
        }

        document.getElementById('chart-seven-switch').addEventListener('change', function(e) {
            if(e.target.checked) {
                switchState = true;
                updateChart('Mujeres');
            } else {
                switchState = false;
                updateChart('Hombres');
            }
        });        
    });
}

function getEigthChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-eight');

    //Lectura de datos
    let file = './data/chart-eight.csv';
    d3.csv(file, function(d) {
        return {
            Escolaridad: d['Escolaridad'],
            Escolaridad_eje: d['Escolaridad_eje'],
            Hombres_total: +d['Hombres_total'].replace(/,/g, '.') * 100,
            Mujeres_total: +d['Mujeres_total'].replace(/,/g, '.') * 100,
            Hombres_formal: +d['Hombres_formal'].replace(/,/g, '.') * 100,
            Mujeres_formal: +d['Mujeres_formal'].replace(/,/g, '.') * 100,
            Hombres_informal: +d['Hombres_informal'].replace(/,/g, '.') * 100,
            Mujeres_informal: +d['Mujeres_informal'].replace(/,/g, '.') * 100
        }
    }, function (error, data) {
        if (error) throw data;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 95, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Agrupación de datos para barras agrupadas
        let edades = data.map(function(d){return d.Escolaridad_eje});
        let columnas = ['Mujeres','Hombres'];
        let newData = [];
        for(let i = 0; i < data.length; i++){
            newData.push({categoria: data[i].Escolaridad_eje, valores: [
                {descriptor: 'Mujeres', escolaridad: data[i].Escolaridad_eje, valor: [data[i].Mujeres_total, data[i].Mujeres_formal, data[i].Mujeres_informal] },
                {descriptor: 'Hombres', escolaridad: data[i].Escolaridad_eje, valor: [data[i].Hombres_total, data[i].Hombres_formal, data[i].Hombres_informal]}                                  
            ]});
        }

        //Eje X > Edades y columnas
        let x0 = d3.scaleBand()
            .rangeRound([0,width])
            .domain(edades)
            .align(1);
        
        let x1 = d3.scaleBand()
            .range([x0.bandwidth(),0])
            .paddingOuter(0.95)
            .domain(columnas);

        let xAxis = function(g){
            g.call(d3.axisBottom(x0))
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
        }

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        let y = d3.scaleLinear()
            .range([height, 0])
            .domain([-25,0])
            .nice();
    
        let yAxis = function(g){
            g.call(d3.axisLeft(y).ticks(5).tickFormat(function(d) { return d + '%'; }))
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
            .attr("y", function(d) { return y(0); })
            .attr('class', function(d,i) { 
                if(d.descriptor == 'Hombres') {
                    return 'rect rect-Hombres';
                } else {
                    return 'rect rect-Mujeres';
                }
            })
            .attr("width", x1.bandwidth() / 2)            
            .attr('data-escolaridad', function(d,i) { return d.escolaridad; })
            .style('fill',function(d) {return d.descriptor == 'Hombres' ? '#081C29' : '#99E6FC'})
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let css = e[i].getAttribute('class').split('-')[1];

                //Texto
                let escolaridad = e[i].getAttribute('data-escolaridad');               
                let tipoEmpleo = currentIndex == 0 ? 'Empleo total' : currentIndex == 1 ? 'Empleo formal' : 'Empleo informal';

                let html = `<p class="chart__tooltip--title">${css} (${escolaridad})</p>
                            <p class="chart__tooltip--text">${tipoEmpleo}: ${numberWithCommas(d.valor[currentIndex].toFixed(2))}%</p>`;

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let rects = chartBlock.selectAll('.rect');

                rects.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`rect-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let rects = chartBlock.selectAll('.rect');
                rects.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.valor[0])); })     
            .attr('height', d => Math.abs(y(d.valor[0]) - y(0)));

        let currentIndex = 0;

        function updateChart(idx) {
            slice
            .selectAll(".rect")
            .data(function(d) { return d.valores; })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.valor[idx])); })     
            .attr('height', d => Math.abs(y(d.valor[idx]) - y(0)));
        }

        document.getElementById('empleoEight').addEventListener('change', function(e) {
            let idx = e.target.value;
            currentIndex = +idx;
            updateChart(idx);
        });
    });
}

function getNinethChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-nine');
    let switchState = false;

    //Lectura de datos
    let file = './data/chart-nine.csv';
    d3.csv(file, function(d) {
        return {
            Pais: d.Pais,
            Escolaridad: d.Escolaridad,
            Hombres: +d.Hombres_total.replace(/,/g, '.') * 100,
            Mujeres: +d.Mujeres_total.replace(/,/g, '.') * 100
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 95, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Agrupación de datos para barras agrupadas
        let paises = d3.nest()
            .key(function(d) { return d.Pais; })
            .entries(data);

        let ejePaises = paises.map(function(d) { return d.key; });
        let columnas = ['[0,8]', '[9,13]', '14+'];
        
        //Eje X > Países y columnas
        let x0 = d3.scaleBand()
            .rangeRound([0,width])
            .domain(ejePaises);
        
        let x1 = d3.scaleBand()
            .range([0, x0.bandwidth()])
            .paddingInner(0.25)
            .paddingOuter(0.5)
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
            .domain([-40,15]);
    
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

        let slice = chart.selectAll(".slice")
            .data(paises)
            .enter()
            .append("g")
            .attr("class", "g")
            .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)"; });

        slice.selectAll("rect")
            .data(function(d) { return d.values; })
            .enter()
            .append("rect")
            .attr("x", function(d) { return x1(d.Escolaridad) })
            .attr("y", function(d) { return y(0); })
            .attr('class', function(d,i) {
                if(d.Escolaridad == '[0,8]') {
                    return 'rect rect-primero';
                } else if (d.Escolaridad == '[9,13]') {
                    return 'rect rect-segundo';
                } else {
                    return 'rect rect-tercero';
                }
            })
            .attr("width", x1.bandwidth())            
            .attr('data-escolaridad', function(d,i) { return d.Escolaridad.replace(/[\[\]]/g, '').replace(',', '-'); })
            .style('fill',function(d) { return d.Escolaridad == '[0,8]' ? '#99E6FC' : d.Escolaridad == '[9,13]' ? '#2347E3' : '#081C29'})
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let css = e[i].getAttribute('class').split('-')[1];

                //Texto
                let genero = switchState == true ? 'Mujeres' : 'Hombres';
                let escolaridad = e[i].getAttribute('data-escolaridad');

                let html = `<p class="chart__tooltip--title">${d.Pais} (${genero} - Años de estudio: ${escolaridad})</p>
                            <p class="chart__tooltip--text">${numberWithCommas(d[genero].toFixed(2))}%</p>`;

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let rects = chartBlock.selectAll('.rect');

                rects.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`rect-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let rects = chartBlock.selectAll('.rect');
                rects.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.Hombres)); })     
            .attr('height', d => Math.abs(y(d.Hombres) - y(0)));
        
        function updateChart(tipo) {
            slice
                .selectAll(".rect")
                .data(function(d) { return d.values; })
                .transition()
                .duration(1500) 
                .attr("y", function(d) { return y(Math.max(0, d[tipo])); })     
                .attr('height', d => Math.abs(y(d[tipo]) - y(0)));
        }

        document.getElementById('chart-nine-switch').addEventListener('change', function(e) {
            if(e.target.checked) {
                switchState = true;
                updateChart('Mujeres');
            } else {
                switchState = false;
                updateChart('Hombres');
            }
        });        
    });
}

function getTenthChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-ten');

    //Lectura de datos
    let file = './data/chart-ten.csv';
    d3.csv(file, function(d) {
        return {
            Escolaridad: d['Escolaridad'],
            Escolaridad_eje: d['Escolaridad_eje'],
            Hombres_total: +d['Hombres'].replace(/,/g, '.') * 100,
            Mujeres_total: +d['Mujeres'].replace(/,/g, '.') * 100
        }
    }, function (error, data) {
        if (error) throw data;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 95, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Agrupación de datos para barras agrupadas
        let edades = data.map(function(d){return d.Escolaridad_eje});
        let columnas = ['Mujeres','Hombres'];
        let newData = [];
        for(let i = 0; i < data.length; i++){
            newData.push({categoria: data[i].Escolaridad_eje, valores: [
                {descriptor: 'Mujeres', escolaridad: data[i].Escolaridad_eje, valor: data[i].Mujeres_total},
                {descriptor: 'Hombres', escolaridad: data[i].Escolaridad_eje, valor: data[i].Hombres_total}                                  
            ]});
        }

        //Eje X > Edades y columnas
        let x0 = d3.scaleBand()
            .rangeRound([0,width])
            .domain(edades);
        
        let x1 = d3.scaleBand()
            .range([x0.bandwidth(),0])
            .paddingOuter(0.5)
            .domain(columnas);

        let xAxis = function(g){
            g.call(d3.axisBottom(x0))
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
        }

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        let y = d3.scaleLinear()
            .range([height, 0])
            .domain([-15,0])
            .nice();
    
        let yAxis = function(g){
            g.call(d3.axisLeft(y).ticks(5).tickFormat(function(d) { return d + '%'; }))
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
            .attr("y", function(d) { return y(0); })
            .attr('class', function(d,i) { 
                if(d.descriptor == 'Hombres') {
                    return 'rect rect-Hombres';
                } else {
                    return 'rect rect-Mujeres';
                }
            })
            .attr("width", x1.bandwidth() / 2)            
            .attr('data-escolaridad', function(d,i) { return d.escolaridad; })
            .style('fill',function(d) {return d.descriptor == 'Hombres' ? '#081C29' : '#99E6FC'})
            .on('mouseenter', function(d, i, e) {
                
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);

            })
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let css = e[i].getAttribute('class').split('-')[1];

                //Texto                
                let escolaridad = e[i].getAttribute('data-escolaridad');                

                let html = `<p class="chart__tooltip--title">${css} (${escolaridad})</p>
                            <p class="chart__tooltip--text">${numberWithCommas(d.valor.toFixed(2))}%</p>`;

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let rects = chartBlock.selectAll('.rect');

                rects.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`rect-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let rects = chartBlock.selectAll('.rect');
                rects.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.valor)); })     
            .attr('height', d => Math.abs(y(d.valor) - y(0)));
    });
}

function getEleventhChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-eleven');
    let switchState = false;

    //Lectura de datos
    let file = './data/chart-eleven.csv';
    d3.csv(file, function(d) {
        return {
            Pais: d.Pais,
            Escolaridad: d.Escolaridad,
            Hombres: +d.Hombres.replace(/,/g, '.') * 100,
            Mujeres: +d.Mujeres.replace(/,/g, '.') * 100
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 95, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Agrupación de datos para barras agrupadas
        let paises = d3.nest()
            .key(function(d) { return d.Pais; })
            .entries(data);

        let ejePaises = paises.map(function(d) { return d.key; });
        let columnas = ['[0,8]', '[9,13]', '14+'];
        
        //Eje X > Países y columnas
        let x0 = d3.scaleBand()
            .rangeRound([0,width])
            .domain(ejePaises);
        
        let x1 = d3.scaleBand()
            .range([0, x0.bandwidth()])
            .paddingInner(0.25)
            .paddingOuter(0.5)
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
            .domain([-30,15]);
    
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

        let slice = chart.selectAll(".slice")
            .data(paises)
            .enter()
            .append("g")
            .attr("class", "g")
            .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)"; });

        slice.selectAll("rect")
            .data(function(d) { return d.values; })
            .enter()
            .append("rect")
            .attr("x", function(d) { return x1(d.Escolaridad) })
            .attr("y", function(d) { return y(0); })
            .attr('class', function(d,i) {
                if(d.Escolaridad == '[0,8]') {
                    return 'rect rect-primero';
                } else if (d.Escolaridad == '[9,13]') {
                    return 'rect rect-segundo';
                } else {
                    return 'rect rect-tercero';
                }
            })
            .attr("width", x1.bandwidth())            
            .attr('data-escolaridad', function(d,i) { return d.Escolaridad.replace(/[\[\]]/g, '').replace(',', '-'); })
            .style('fill',function(d) { return d.Escolaridad == '[0,8]' ? '#99E6FC' : d.Escolaridad == '[9,13]' ? '#2347E3' : '#081C29'})
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let css = e[i].getAttribute('class').split('-')[1];

                //Texto
                let genero = switchState == true ? 'Mujeres' : 'Hombres';
                let escolaridad = e[i].getAttribute('data-escolaridad');

                let html = `<p class="chart__tooltip--title">${d.Pais} (${genero} - Años de estudio: ${escolaridad})</p>
                            <p class="chart__tooltip--text">${numberWithCommas(d[genero].toFixed(2))}%</p>`;

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let rects = chartBlock.selectAll('.rect');

                rects.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`rect-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let rects = chartBlock.selectAll('.rect');
                rects.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.Hombres)); })     
            .attr('height', d => Math.abs(y(d.Hombres) - y(0)));
        
        function updateChart(tipo) {
            slice
                .selectAll(".rect")
                .data(function(d) { return d.values; })
                .transition()
                .duration(1500) 
                .attr("y", function(d) { return y(Math.max(0, d[tipo])); })     
                .attr('height', d => Math.abs(y(d[tipo]) - y(0)));
        }

        document.getElementById('chart-eleven-switch').addEventListener('change', function(e) {
            if(e.target.checked) {
                switchState = true;
                updateChart('Mujeres');
            } else {
                switchState = false;
                updateChart('Hombres');
            }
        });        
    });
}

function getTwelvethChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-twelve');

    //Lectura de datos
    let file = './data/chart-twelve.csv';
    d3.csv(file, function(d) {
        return {
            Escolaridad: d['Escolaridad'],
            Escolaridad_eje: d['Escolaridad_eje'],
            Hombres_total: +d['Hombres'].replace(/,/g, '.') * 100,
            Mujeres_total: +d['Mujeres'].replace(/,/g, '.') * 100
        }
    }, function (error, data) {
        if (error) throw data;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 95, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Agrupación de datos para barras agrupadas
        let edades = data.map(function(d){return d.Escolaridad_eje});
        let columnas = ['Mujeres','Hombres'];
        let newData = [];
        for(let i = 0; i < data.length; i++){
            newData.push({categoria: data[i].Escolaridad_eje, valores: [
                {descriptor: 'Mujeres', escolaridad: data[i].Escolaridad_eje, valor: data[i].Mujeres_total},
                {descriptor: 'Hombres', escolaridad: data[i].Escolaridad_eje, valor: data[i].Hombres_total}                                  
            ]});
        }

        //Eje X > Edades y columnas
        let x0 = d3.scaleBand()
            .rangeRound([0,width])
            .domain(edades);
        
        let x1 = d3.scaleBand()
            .range([x0.bandwidth(),0])
            .paddingOuter(0.5)
            .domain(columnas);

        let xAxis = function(g){
            g.call(d3.axisBottom(x0))
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
        }

        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        let y = d3.scaleLinear()
            .range([height, 0])
            .domain([-6,0])
            .nice();
    
        let yAxis = function(g){
            g.call(d3.axisLeft(y).ticks(5).tickFormat(function(d) { return d + '%'; }))
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
            .attr("y", function(d) { return y(0); })
            .attr('class', function(d,i) { 
                if(d.descriptor == 'Hombres') {
                    return 'rect rect-Hombres';
                } else {
                    return 'rect rect-Mujeres';
                }
            })
            .attr("width", x1.bandwidth() / 2)            
            .attr('data-escolaridad', function(d,i) { return d.escolaridad; })
            .style('fill',function(d) {return d.descriptor == 'Hombres' ? '#081C29' : '#99E6FC'})
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let css = e[i].getAttribute('class').split('-')[1];

                //Texto
                let escolaridad = e[i].getAttribute('data-escolaridad');                

                let html = `<p class="chart__tooltip--title">${css} (${escolaridad})</p>
                            <p class="chart__tooltip--text">${numberWithCommas(d.valor.toFixed(2))}%</p>`;

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let rects = chartBlock.selectAll('.rect');

                rects.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`rect-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let rects = chartBlock.selectAll('.rect');
                rects.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.valor)); })     
            .attr('height', d => Math.abs(y(d.valor) - y(0)));
    });
}

function getThirteenthChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-thirteen');
    let switchState = false;

    //Lectura de datos
    let file = './data/chart-thirteen.csv';
    d3.csv(file, function(d) {
        return {
            Pais: d.Pais,
            Escolaridad: d.Escolaridad,
            Hombres: +d.Hombres.replace(/,/g, '.') * 100,
            Mujeres: +d.Mujeres.replace(/,/g, '.') * 100
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 95, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Agrupación de datos para barras agrupadas
        let paises = d3.nest()
            .key(function(d) { return d.Pais; })
            .entries(data);

        let ejePaises = paises.map(function(d) { return d.key; });
        let columnas = ['[0,8]', '[9,13]', '14+'];
        
        //Eje X > Países y columnas
        let x0 = d3.scaleBand()
            .rangeRound([0,width])
            .domain(ejePaises);
        
        let x1 = d3.scaleBand()
            .range([0, x0.bandwidth()])
            .paddingInner(0.25)
            .paddingOuter(0.5)
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
            .domain([-20,10]);
    
        let yAxis = function(g){
            g.call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return d + '%'; }))
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

        let slice = chart.selectAll(".slice")
            .data(paises)
            .enter()
            .append("g")
            .attr("class", "g")
            .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)"; });

        slice.selectAll("rect")
            .data(function(d) { return d.values; })
            .enter()
            .append("rect")
            .attr("x", function(d) { return x1(d.Escolaridad) })
            .attr("y", function(d) { return y(0); })
            .attr('class', function(d,i) {
                if(d.Escolaridad == '[0,8]') {
                    return 'rect rect-primero';
                } else if (d.Escolaridad == '[9,13]') {
                    return 'rect rect-segundo';
                } else {
                    return 'rect rect-tercero';
                }
            })
            .attr("width", x1.bandwidth())            
            .attr('data-escolaridad', function(d,i) { return d.Escolaridad.replace(/[\[\]]/g, '').replace(',', '-'); })
            .style('fill',function(d) { return d.Escolaridad == '[0,8]' ? '#99E6FC' : d.Escolaridad == '[9,13]' ? '#2347E3' : '#081C29'})
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let css = e[i].getAttribute('class').split('-')[1];

                //Texto
                let genero = switchState == true ? 'Mujeres' : 'Hombres';
                let escolaridad = e[i].getAttribute('data-escolaridad');

                let html = `<p class="chart__tooltip--title">${d.Pais} (${genero} - Años de estudio: ${escolaridad})</p>
                            <p class="chart__tooltip--text">${numberWithCommas(d[genero].toFixed(2))}%</p>`;

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let rects = chartBlock.selectAll('.rect');

                rects.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`rect-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let rects = chartBlock.selectAll('.rect');
                rects.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .duration(3000)            
            .attr("y", function(d) { return y(Math.max(0, d.Hombres)); })     
            .attr('height', d => Math.abs(y(d.Hombres) - y(0)));
        
        function updateChart(tipo) {
            slice
                .selectAll(".rect")
                .data(function(d) { return d.values; })
                .transition()
                .duration(1500) 
                .attr("y", function(d) { return y(Math.max(0, d[tipo])); })     
                .attr('height', d => Math.abs(y(d[tipo]) - y(0)));
        }

        document.getElementById('chart-thirteen-switch').addEventListener('change', function(e) {
            if(e.target.checked) {
                switchState = true;
                updateChart('Mujeres');
            } else {
                switchState = false;
                updateChart('Hombres');
            }
        });        
    });
}

function getFourteenChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-fourteen');

    //Lectura de datos
    let file = './data/chart-fourteen.csv';
    d3.csv(file, function(d) {
        return {
            Fecha: d.Fecha_eje,
            Fecha_eje: d.Fecha_eje,
            PrimerNivel: +d['8anios'].replace(/,/g, '.') * 100,
            SegundoNivel: +d['9-12'].replace(/,/g, '.') * 100,
            TercerNivel: +d['12+'].replace(/,/g, '.') * 100
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 20, bottom: 25, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Disposición del eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.Fecha }))
            .range([0, width])
            .paddingInner(1);

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
            .domain([0,40])
            .range([height,0])
            .nice();
    
        let yAxis = function(svg){
            svg.call(d3.axisLeft(y).tickFormat(function(d) { return d + '%'; }))
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
            {lineName: 'linePrimerNivel', xAxis: 'Fecha_eje', yAxis: 'PrimerNivel', cssLine: 'line-PrimerNivel', cssCircle: 'circle-PrimerNivel', cssColor: '#99E6FC'},
            {lineName: 'lineSegundoNivel', xAxis: 'Fecha_eje', yAxis: 'SegundoNivel', cssLine: 'line-SegundoNivel', cssCircle: 'circle-SegundoNivel', cssColor: '#2347E3'},
            {lineName: 'lineTercerNivel', xAxis: 'Fecha_eje', yAxis: 'TercerNivel', cssLine: 'line-TercerNivel', cssCircle: 'circle-TercerNivel', cssColor: '#081C29'}
        ]

        setMultipleLines(chartBlock, chart, data, 'percentage', lines, x, y, tooltip);
    });
}

function getFourteenBisChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-fourteen_bis');

    //Lectura de datos
    let file = './data/chart-fourteen_bis.csv';
    d3.csv(file, function(d) {
        return {
            Fecha: d.Fecha_eje,
            Fecha_eje: d.Fecha_eje,
            PrimerNivel: +d['ciclo_basico'].replace(/,/g, '.'),
            SegundoNivel: +d['segundo'].replace(/,/g, '.'),
            TercerNivel: +d['tercero'].replace(/,/g, '.'),
            CuartoNivel: +d['tercero_completo'].replace(/,/g, '.')
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 20, bottom: 25, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Disposición del eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.Fecha }))
            .range([0, width])
            .paddingInner(1);

        //Estilos para eje X
        let xAxis = function(g){
            g.call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ return !(i%3)})))
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
            .domain([0,60])
            .range([height,0])
            .nice();
    
        let yAxis = function(svg){
            svg.call(d3.axisLeft(y).tickFormat(function(d) { return d + '%'; }))
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
            {lineName: 'linePrimerNivel', xAxis: 'Fecha_eje', yAxis: 'PrimerNivel', cssLine: 'line-PrimerNivel', cssCircle: 'circle-PrimerNivel', cssColor: '#99E6FC'},
            {lineName: 'lineSegundoNivel', xAxis: 'Fecha_eje', yAxis: 'SegundoNivel', cssLine: 'line-SegundoNivel', cssCircle: 'circle-SegundoNivel', cssColor: '#2347E3'},
            {lineName: 'lineTercerNivel', xAxis: 'Fecha_eje', yAxis: 'TercerNivel', cssLine: 'line-TercerNivel', cssCircle: 'circle-TercerNivel', cssColor: '#081C29'},
            {lineName: 'lineCuartoNivel', xAxis: 'Fecha_eje', yAxis: 'CuartoNivel', cssLine: 'line-CuartoNivel', cssCircle: 'circle-CuartoNivel', cssColor: '#474b4e'}
        ]

        setMultipleLines(chartBlock, chart, data, 'percentage', lines, x, y, tooltip);
    });
}

function getFourteenTrisChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-fourteen_tris');

    //Lectura de datos
    let file = './data/chart-fourteen_tris.csv';
    d3.csv(file, function(d) {
        return {
            Fecha: d.Fecha_eje,
            Fecha_eje: d.Fecha_eje,
            PrimerNivel: +d['Primaria'].replace(/,/g, '.'),
            SegundoNivel: +d['Secundaria'].replace(/,/g, '.'),
            TercerNivel: +d['Medio superior'].replace(/,/g, '.'),
            CuartoNivel: +d['Superior'].replace(/,/g, '.'),
            QuintoNivel: +d['no_especificado'].replace(/,/g, '.')
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 20, bottom: 25, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Disposición del eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.Fecha }))
            .range([0, width])
            .paddingInner(1);

        //Estilos para eje X
        let xAxis = function(g){
            g.call(d3.axisBottom(x))
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
            .domain([0,50])
            .range([height,0])
            .nice();
    
        let yAxis = function(svg){
            svg.call(d3.axisLeft(y).tickFormat(function(d) { return d + '%'; }))
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
            {lineName: 'linePrimerNivel', xAxis: 'Fecha_eje', yAxis: 'PrimerNivel', cssLine: 'line-PrimerNivel', cssCircle: 'circle-PrimerNivel', cssColor: '#99E6FC'},
            {lineName: 'lineSegundoNivel', xAxis: 'Fecha_eje', yAxis: 'SegundoNivel', cssLine: 'line-SegundoNivel', cssCircle: 'circle-SegundoNivel', cssColor: '#2347E3'},
            {lineName: 'lineTercerNivel', xAxis: 'Fecha_eje', yAxis: 'TercerNivel', cssLine: 'line-TercerNivel', cssCircle: 'circle-TercerNivel', cssColor: '#081C29'},
            {lineName: 'lineCuartoNivel', xAxis: 'Fecha_eje', yAxis: 'CuartoNivel', cssLine: 'line-CuartoNivel', cssCircle: 'circle-CuartoNivel', cssColor: '#474b4e'},
            {lineName: 'lineQuintoNivel', xAxis: 'Fecha_eje', yAxis: 'QuintoNivel', cssLine: 'line-QuintoNivel', cssCircle: 'circle-QuintoNivel', cssColor: '#9b9b9b'}
        ]

        setMultipleLines(chartBlock, chart, data, 'percentage', lines, x, y, tooltip);
    });
}

function getFifteenChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-fifteen');

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
        let margin = {top: 5, right: 5, bottom: 25, left: 125};
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
                return x(0);
            })
            .attr("y", function (d) {
                return y(d.tipo_eje) + y.bandwidth() / 4;
            })            
            .attr("height", y.bandwidth() / 2)
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let css = e[i].getAttribute('class').split('-')[1];
                //Texto
                let html = `<p class="chart__tooltip--title">${d.tipo}</p>
                            <p class="chart__tooltip--text">${numberWithCommas(d.porcentaje.toFixed(2))}%</p>`; //Solucionar recogida de información

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let bars = chartBlock.selectAll('.bar');
                
                bars.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`bar-${css}`) != -1) {
                        this.style.opacity = '1';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let bars = chartBlock.selectAll('.bar');
                bars.each(function() {
                    this.style.opacity = '1';
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip); 
            })
            .transition()
            .duration(3000)
            .attr("x", function (d) {
                return x(Math.min(0, d.porcentaje));
            })
            .attr("width", function (d) {
                return Math.abs(x(d.porcentaje) - x(0));
            });           
    });
}

function getSixteenthChart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-sixteen');

    //Lectura de datos
    let file = './data/chart-sixteen.csv';
    d3.csv(file, function(d) {
        return {
            pais: d.Pais,
            Vacantes: +d['Cambio en Vacantes'].replace(/,/g, '.').replace('%',''),
            Experiencia: +d['Experiencia'].replace(/,/g, '.').replace('%',''),
            Educacion: +d['Educacion'].replace(/,/g, '.').replace('%',''),
            Teletrabajo: +d['Teletrabajo'].replace(/,/g, '.').replace('%','')
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 115, left: 45};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.pais; }))
            .range([0, width]);

        let xAxis = function(g){
            g.call(d3.axisBottom(x))
            g.call(function(g){g.selectAll('.tick line').remove()})
            g.call(function(g){g.select('.domain').remove()})
            g.call(function(g){
                g.selectAll('.tick text')
                    .style("text-anchor", "end")
                    .style("font-weight", function(d) {if(d == 'LAC (Media Simple)') { return 'bold'; }})
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d) {
                        return "rotate(-65)" 
                    });
            });            
        }        
        
        chart.append("g")
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)

        //Eje Y
        let y = d3.scaleLinear()
            .domain([-80,120])
            .range([height, 0])
            .nice();
        
        let yAxis = svg => svg
            .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return d + '%'; }))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line')
                .attr("class", function(d) { if (d == 0) { return 'line-special'; }})
                .attr("x1", `0`)
                .attr("x2", `${width}`)
            );

        chart.append('g')
            .call(yAxis);

        //Primera visualización de datos
        let tipoGenerico = 'Vacantes';
        initChart(tipoGenerico);

        //Actualización
        document.getElementById('empleoSixteen').addEventListener('change', function(e) {
            tipoGenerico = e.target.value;
            updateChart(tipoGenerico);
        });

        //Funciones internas
        function initChart(tipo) {
            chart.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr('class', function(d, i) { return `bar bar-${i}`; })
                .style('fill', function(d) {if (d.pais == 'LAC (Media Simple)') { return '#8ca0ad'; } else { return '#081C29'; }} )
                .attr('x', function(d) { return x(d.pais) + x.bandwidth() / 4; })
                .attr('width', x.bandwidth() / 2)
                .attr("y", function(d) { return y(0); })
                .on('touchstart touchmove mouseover mousemove', function(d, i, e) {
                    let css = e[i].getAttribute('class').split('-')[1];
                    //Texto
                    let html = `<p class="chart__tooltip--title">${d.pais}</p>
                                <p class="chart__tooltip--text">${tipoGenerico}: ${numberWithCommas(d[tipoGenerico].toFixed(2))}%</p>`;
                
                    tooltip.html(html);

                    //Posibilidad visualización línea diferente
                    let bars = chartBlock.selectAll('.bar');                    
                
                    bars.each(function() {
                        this.style.opacity = '0.4';
                        let split = this.getAttribute('class').split(" ")[1];
                        if(split == `bar-${css}`) {
                            this.style.opacity = '1';
                        }
                    });
                
                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('touchend mouseout', function(d, i, e) {
                    //Quitamos los estilos de la línea
                    let bars = chartBlock.selectAll('.bar');
                    bars.each(function() {
                        this.style.opacity = '1';
                    });
                
                    //Quitamos el tooltip
                    getOutTooltip(tooltip); 
                })
                .transition()
                .duration(3000)
                .attr("y", function(d) { return y(Math.max(0, d[tipo])); })     
                .attr('height', d => Math.abs(y(d[tipo]) - y(0)));
        }

        function updateChart(tipo) {
            chart
                .selectAll(".bar")
                .data(data)
                .transition()
                .duration(1500)
                .attr("y", function(d) { return y(Math.max(0, d[tipo])); })     
                .attr('height', d => Math.abs(y(d[tipo]) - y(0)));
        }
    });
}

function getSeventeenthChart() {

}

function getEighteenthChart() {

}

//Nuevos gráficos
function get4_6Chart() {
    //Bloque de la visualización
    let chartBlock = d3.select('#chart-4_6');

    //Lectura de datos
    let file = './data/chart-4_6.csv';
    d3.csv(file, function(d) {
        return {
            pais: d.Pais,
            Horas_trabajadas: +d['Cambio en horas trabajadas'].replace(/,/g, '.').replace('%',''),
            Salarios: +d['Cambios en salarios'].replace(/,/g, '.').replace('%',''),
        }
    }, function(error, data) {
        if (error) throw error;
        
        //Creación del elemento SVG en el contenedor
        let margin = {top: 5, right: 5, bottom: 100, left: 35};
        let {width, height, chart} = setChart(chartBlock, margin);

        //Eje X
        let x = d3.scaleBand()
            .domain(data.map(function(d) { return d.pais; }))
            .range([0, width]);

        let xAxis = function(g){
            g.call(d3.axisBottom(x))
            g.call(function(g){g.selectAll('.tick line').remove()})
            g.call(function(g){g.select('.domain').remove()})
            g.call(function(g){
                g.selectAll('.tick text')
                    .style("text-anchor", "end")
                    .style('font-weight', function(d) { if (d == 'Promedio') { return 'bold'; }})
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d) {
                        return "rotate(-65)" 
                    });
            });            
        }        
        
        chart.append("g")
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)

        //Eje Y
        let y = d3.scaleLinear()
            .domain([-15,10])
            .range([height, 0])
            .nice();
        
        let yAxis = svg => svg
            .call(d3.axisLeft(y).ticks(4).tickFormat(function(d) { return d + '%'; }))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line')
                .attr("class", function(d) { if (d == 0) { return 'line-special'; }})
                .attr("x1", `0`)
                .attr("x2", `${width}`)
            );

        chart.append('g')
            .call(yAxis);

        //Primera visualización de datos
        let tipoGenerico = 'Horas_trabajadas';
        initChart(tipoGenerico);

        //Actualización
        document.getElementById('empleo4_6').addEventListener('change', function(e) {
            tipoGenerico = e.target.value;
            updateChart(tipoGenerico);
        });

        //Funciones internas
        function initChart(tipo) {
            chart.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr('class', function(d, i) { return `bar bar-${i}`; })
                .style('fill', function(d) {if (d.pais == 'Promedio') { return '#8ca0ad'; } else { return '#081C29'; }} )
                .attr('x', function(d) { return x(d.pais) + x.bandwidth() / 4; })
                .attr('width', x.bandwidth() / 2)
                .attr("y", function(d) { return y(0); })
                .on('mouseenter', function(d, i, e) {
                    
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('touchstart touchmove mouseover mousemove', function(d, i, e) {
                    let css = e[i].getAttribute('class').split('-')[1];
                    //Texto
                    let tipoTexto = tipoGenerico == 'Horas_trabajadas' ? 'Cambio en horas trabajadas' : 'Cambio en salarios'
                    let html = `<p class="chart__tooltip--title">${d.pais}</p>
                                <p class="chart__tooltip--text">${tipoTexto}: ${numberWithCommas(d[tipoGenerico].toFixed(1))}%</p>`;
                
                    tooltip.html(html);

                    //Posibilidad visualización línea diferente
                    let bars = chartBlock.selectAll('.bar');                    
                
                    bars.each(function() {
                        this.style.opacity = '0.4';
                        let split = this.getAttribute('class').split(" ")[1];
                        if(split == `bar-${css}`) {
                            this.style.opacity = '1';
                        }
                    });
                
                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);
                })
                .on('touchend mouseout', function(d, i, e) {
                    //Quitamos los estilos de la línea
                    let bars = chartBlock.selectAll('.bar');
                    bars.each(function() {
                        this.style.opacity = '1';
                    });
                
                    //Quitamos el tooltip
                    getOutTooltip(tooltip); 
                })
                .transition()
                .duration(3000)
                .attr("y", function(d) { return y(Math.max(0, d[tipo])); })     
                .attr('height', d => Math.abs(y(d[tipo]) - y(0)));
        }

        function updateChart(tipo) {
            chart
                .selectAll(".bar")
                .data(data)
                .transition()
                .duration(1500)
                .attr("y", function(d) { return y(Math.max(0, d[tipo])); })     
                .attr('height', d => Math.abs(y(d[tipo]) - y(0)));
        }
    });
}


// Ejecución visualizaciones
getFirstChart();
getSecondChart();
getSecondBisChart();
getThirdChart();
get4_6Chart();
getFourthChart();
getFourthBisChart();
getFifthChart();
getFifthBisChart();
getSixthChart();
getSeventhChart();
getEigthChart();
getNinethChart();
getTenthChart();
getEleventhChart();
getTwelvethChart();
getThirteenthChart();
getFourteenChart();
getFourteenBisChart();
getFourteenTrisChart();
getFifteenChart();
getSixteenthChart();

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

function setMultipleLines(chartBlock, chart, data, dataType, lines, x, y, tooltip) {
    for(let i = 0; i < lines.length; i++) {
        let line = d3.line()
            .x(function(d) { return x(d[lines[i].xAxis]) + x.bandwidth() / 2; })
            .y(function(d) { return y(d[lines[i].yAxis]); });

        let path = chart.append("path")
            .data([data])
            .attr("class", `line ${lines[i].cssLine}`)
            .attr("fill", "none")
            .attr("stroke", `${lines[i].cssColor}`)
            .attr("stroke-width", '1.5px')
            .attr("d", line);

        let length = path.node().getTotalLength();

        path.attr("stroke-dasharray", length + " " + length)
            .attr("stroke-dashoffset", length)
            .transition()
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0)
            .duration(8000)

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
            .on('touchstart touchmove mousemove mouseover', function(d, i, e) {
                let css = e[i].getAttribute('class').split('-')[1];

                //Texto
                let html = `<p class="chart__tooltip--title">${d.Fecha}</p>
                            <p class="chart__tooltip--text">${css}: ${numberWithCommas(d[css].toFixed(1))}${dataType == 'percentage' ? '%' : 'M'}</p>`; //Solucionar recogida de información

                tooltip.html(html);

                //Posibilidad visualización línea diferente
                let lines = chartBlock.selectAll('.line');                

                lines.each(function() {
                    this.style.opacity = '0.4';
                    if(this.getAttribute('class').indexOf(`line-${css}`) != -1) {
                        this.style.opacity = '1';
                        this.style.strokeWidth = '3px';
                    }
                });

                //Tooltip
                positionTooltip(window.event, tooltip);
                getInTooltip(tooltip);               
            })
            .on('touchend mouseout', function(d, i, e) {
                //Quitamos los estilos de la línea
                let lines = chartBlock.selectAll('.line');

                lines.each(function() {
                    this.style.opacity = '1';
                    this.style.strokeWidth = '1.5px';                    
                });

                //Quitamos el tooltip
                getOutTooltip(tooltip);                
            })
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\./g, ',').replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}