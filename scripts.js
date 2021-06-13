const config = {
    displayModeBar: false,
    responsive: true
}

const plot1Div = document.getElementById("vis1");
const plot2Div = document.getElementById("vis2");

Plotly.d3.csv("extracted_data - Sheet1.csv", function(rows){

    var trace0= {
        type: "scatter",
        //tweets = tweets.filter(tweet => tweet.sentiment > 0.5) //positive tweets
        //tweets = tweets.filter(tweet => tweet.sentiment < 0) //negative tweets
        name: "Sentiment value <br>> 0.5 = positive tweets<br>< 0 = negative tweets",
        x: unpack(rows, "Date"),
        y: unpack(rows, "Sentiment value"),
        customdata: unpack(rows, 'content').map(x => convertToParagraph(x, 64)),
        hovertemplate:
              "Trump: %{customdata}<br>" +
              "<br>"+
              "Sentiment Value: %{y}<br>" +
              "Posting Date: %{x}<br>" +
              "<extra></extra>", // Hides the trace number
        line: {
            dash: 'dot',
            width: 3,
            color: '#8F5FBB'
        },
        marker: {
            color: '#8F5FBB',
            size: 8
        }
    }

    var trace1= {
        name: "Count of the term 'Coronavirus' <br> used in Trump's tweet on the date",
        x: unpack(rows, "Date"),
        y: unpack(rows, "Wording choice(Coronavirus)"),
        type: "bar",
        hoverinfo: "skip",
        marker: {
            color: '#08A0E9',
            opacity: 1,
        }
    }

    var trace2= {
        name: "Count of the term 'Chinese Virus' <br> used in Trump's tweet on the date",
        x: unpack(rows, "Date"),
        y: unpack(rows, "Wording choice(Chinese Virus)"),
        type: "bar",
        hoverinfo: "skip",
        marker: {
            color: '#DD76A8',
            opacity: 1,
          }
    }

    var trace3= {
        name: "Count of the term 'virus' <br> used in Trump's tweet on the date", 
        x: unpack(rows, "Date"),
        y: unpack(rows, "Wording choice(virus)"),
        type: "bar",
        hoverinfo: "skip",
        marker: {
            color: '#9EADBD',
            opacity: 1,
          }
    }

    var data1 = [trace0, trace1, trace2, trace3];

    var layout1 = {
        /*https://plotly.com/javascript/bar-charts/*/
        barmode: 'stack',
        title: {
            text:'Sentiment value of Donald Trump‘s China COVID-19 related tweets from 2020 January to March',
            font: {
                family: 'Abril Fatface',
                size: 24,
                color: '#0054B4'
            },
            xref: 'container',
            x: 0.5,
            y: 0.9
        },
        paper_bgcolor: 'whtie',
        plot_bgcolor: 'white',
        autosize: true,
        height: 700,
        legend: {
            y: 0.5,
            font: {
                family: 'Abril Fatface',
                size: 15,
                color: 'black'
            }
        },
        margin: {
            l: 200,
            r: 400,
            b: 100,
            t: 200,
            pad: 25
        },
        xaxis: {
            tickfont: {
                family: 'Abril Fatface',
                size: 15,
                color: '#0054B4'
            },
            ticklabelposition: "inside",
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
            type: 'date',
            rangeslider: { range: ['2020-01-24', '2020-03-27'] }
        },
        yaxis: {
            title: {
                text: 'Sentiment Value',
                font: {
                  family: 'Abril Fatface',
                  size: 23,
                  color: '#0054B4'
                },
                standoff: 40
            },
            tickfont: {
                family: 'Abril Fatface',
                size: 13,
                color: '#0054B4'
            },
            autorange: true,
        },
        annotations: [
            {
                x: "2020-03-12 22:37:00-0800",
                y: 0,
                xref: 'x',
                yref: 'y',
                text: 'Zhao Lijian, the spokesperson of China’s Ministry of Foreign Affairs, tweeted on March 12 to ask, “When did<br> patient zero begin in US? How many people are infected? What are the names of the hospitals? It might be<br>US army who brought the epidemic to Wuhan. Be transparent! Make public your data! US owe us an explanation!” ',
                bordercolor: 'black',
                borderpad: 6,
                bgcolor: '#08A0E9',
                showarrow: true,
                arrowhead: 7,
                arrowsize: 0.7,
                arrowwidth: 3,
                ax: -100,
                ay: -280,
                opacity: 0.8
            }
        ],
        hovermode:'closest',
        hoverlabel: { bgcolor: "rgb(8,160,233)" }
    }

    var PieColors = [
        ['#08004F', '#6441A1', '#A178DF', '#EDC0FF']
    ];

    var data2 = [{
        values: [6.06, 22.42, 63.03, 8.48],
        labels: ['Chinese Virus', 'China Virus', 'Coronavirus', 'COVID-19'],
        type: 'pie',
        hoverinfo: "skip",
        marker: {
            colors: PieColors[0]
        }
    }];
      
    var layout2 = {
        /*https://plotly.com/javascript/bar-charts/*/
        barmode: 'stack',
        title: {
            text:'Ratio of appearance between each phrase on Trump‘s tweets in 2020',
            font: {
                family: 'Abril Fatface',
                size: 25,
                color: '#0054B4'
            },
            xref: 'container',
            x: 0.5,
        },
        paper_bgcolor: '#D3F4FF',
        plot_bgcolor: '#D3F4FF',
        autosize: true,
        height: 600,
        legend: {
            x: 0.7,
            y: 0.5,
            font: {
                family: 'Abril Fatface',
                size: 16,
                color: 'black'
            }
        },
        margin: {
            l: 100,
            r: 100,
            b: 100,
            t: 150,
            pad: 20
        }
    }


    Plotly.newPlot(plot1Div, data1, layout1, config);
    Plotly.newPlot(plot2Div, data2, layout2, config);
});

//from https://codereview.stackexchange.com/a/171857
function convertToParagraph(sentence, maxLineLength){
    let lineLength = 0;
    sentence = sentence.split(" ")
    return sentence.reduce((result, word) => {
      if (lineLength + word.length >= maxLineLength) {
        lineLength = word.length;
        return result + `<br>${word}`;
      } else {
        lineLength += word.length + (result ? 1 : 0);
        return result ? result + ` ${word}` : `${word}`;
      }
    }, '');
  }

function unpack(rows, key) {
    return rows.map(function(row) {return row[key];});
}