const lineColors = {
    green: "#44bb66",
    red: "#bb4466",
    blue: "#4466bb"
}

const config = {
    displayModeBar: false,
    responsive: true
}

const plot1Div = document.getElementById("vis1");
const plot2Div = document.getElementById("vis2");

Plotly.d3.csv("sentiment_value.csv", function(rows){

    var trace0= {
        type: "scatter",
        mode: "lines",
        name: "Sentiment value",
        x: unpack(rows, "Date"),
        y: unpack(rows, "Sentiment value"),
        line: {
            color: lineColors.red
        }
    }

    var data1 = [trace0];

    var layout1 = {
        title: "meow",
        xaxis: {
            autorange: true,
            rangeselector: {
                buttons: [{
                        count: 1,
                        label: '1m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {
                        count: 6,
                        label: '6m',
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