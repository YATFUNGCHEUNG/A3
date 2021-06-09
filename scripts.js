const config = {
    displayModeBar: false,
    responsive: true
}

const plot1Div = document.getElementById("vis1");
const plot2Div = document.getElementById("vis2");

Plotly.d3.csv("extracted_data - Sheet1.csv", function(rows){

    var trace0= {
        type: "scatter",
        name: "Sentiment value",
        x: unpack(rows, "Date"),
        y: unpack(rows, "Sentiment value"),
        line: {
            dash: 'dot',
            width: 3,
            color: '#F66D56'
        },
        marker: {
            color: '#F66D56',
            size: 8
        }
    }

    var trace1= {
        name: "Count of Trump mentioned the term 'Coronavirus' <br> in his tweet on the date",
        x: unpack(rows, "Date"),
        y: unpack(rows, "Wording choice(Coronavirus)"),
        type: "bar",
        marker: {
            color: '#3BC08E',
            opacity: 1,
        }
    }

    var trace2= {
        name: "Count of Trump mentioned the term 'Chinese virus' <br> in his tweet on the date",
        x: unpack(rows, "Date"),
        y: unpack(rows, "Wording choice(Chinese Virus)"),
        type: "bar",
        marker: {
            color: '#AD2275',
            opacity: 1,
          }
    }

    var trace3= {
        name: "Count of Trump mentioned the term 'virus' <br> in his tweet on the date",
        x: unpack(rows, "Date"),
        y: unpack(rows, "Wording choice(virus)"),
        type: "bar",
        marker: {
            color: '#F9F871',
            opacity: 1,
          }
    }

    var data1 = [trace0, trace1, trace2, trace3];

    var layout1 = {
        /*https://plotly.com/javascript/bar-charts/*/
        barmode: 'stack',
        title: {
            text:'Plot Title',
            font: {
                family: 'Abril Fatface',
                size: 24,
                color: 'rgb(8,160,233)'
            },
            xref: 'paper',
            x: 0.5,
        },
        paper_bgcolor: '#D3F4FF',
        plot_bgcolor: '#D3F4FF',
        height: 600,
        legend: {
            y: 0.5,
            font: {
                family: 'Abril Fatface',
                size: 12,
                color: 'rgb(8,160,233)'
            }
        },
        margin: {
            l: 100,
            r: 50,
            b: 80,
            t: 80,
            pad: 20
        },
        xaxis: {
            title: {
                text: 'x Axis',
                font: {
                  family: 'Abril Fatface',
                  size: 18,
                  color: 'rgb(8,160,233)'
                }
              },
            tickfont: {
                family: 'Abril Fatface',
                size: 13,
                color: 'rgb(8,160,233)'
            },  
            autorange: true,
            rangeselector: {
                buttons: [{
                        count: 1,
                        label: '1 month',
                        step: 'month',
                        stepmode: 'backward'
                    }, {
                        step: 'all'
                    }    
                ]
            },
            type: 'date'
        }
    }

    Plotly.newPlot(plot1Div, data1, layout1, config);
});

function unpack(rows, key) {
    return rows.map(function(row) {return row[key];});
}