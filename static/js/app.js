// URL for the JSON data
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Function to create the bar chart
function createBarChart(data) {
  const sampleValues = data.sample_values.slice(0, 10).reverse();
  const otuIds = data.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
  const otuLabels = data.otu_labels.slice(0, 10).reverse();

  const trace = {
    x: sampleValues,
    y: otuIds,
    text: otuLabels,
    type: 'bar',
    orientation: 'h',
    marker: {
      color: 'rgb(134, 191, 127)' // Set the bar color to rgb(3, 52, 49)
    }
  };

  const layout = {
    title: 'Top 10 OTUs Found in Individual',
    xaxis: { title: 'Sample Values' },
    yaxis: { title: 'OTU IDs' }
  };

  const chartData = [trace];

  Plotly.newPlot('bar', chartData, layout);
  }






// Function to create the bubble chart
function createBubbleChart(data) {
    const trace = {
      x: data.otu_ids,
      y: data.sample_values,
      text: data.otu_labels,
      mode: 'markers',
      marker: {
        size: data.sample_values,
        color: data.otu_ids,
        colorscale: 'Earth',
        opacity: 0.8
      }
    };
  
    const layout = {
      title: 'OTU IDs vs. Sample Values',
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' },
      width: 1500, // Set the width of the chart (adjust as needed)
      height: 600, // Set the height of the chart (adjust as needed)
      margin: {
        l: 100, // Adjust the left margin
        r: 100, // Adjust the right margin
        b: 100, // Adjust the bottom margin
        t: 100, // Adjust the top margin
      }
    };
  
    const chartData = [trace];
  
    Plotly.newPlot('bubble', chartData, layout);
  }
  

  

// Function to display sample metadata
function displayMetadata(metadata) {
    const metadataDiv = d3.select('#sample-metadata');
    metadataDiv.html(''); // Clear previous content
  
    Object.entries(metadata).forEach(([key, value]) => {
      metadataDiv.append('p').text(`${key}: ${value}`);
    });
  }
  

  
  

// Function to create the gauge chart
function createCustomGaugeChart(wfreq) {
  // Enter the value for the washing frequency (0 through 9)
  var level = parseFloat(wfreq) * 20;

  // Trig to calc meter point
  var degrees = 180 - level,
    radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [
    {
      type: 'scatter',
      x: [0],
      y: [0],
      marker: { size: 14, color: '850000' },
      showlegend: false,
      name: 'Wash Freq',
      text: wfreq,
      hoverinfo: 'text+name'
    },
    {
      //50 at the tail end of the left side represent the blank half of the circle.  50/9 represents each portion of the visible arch.
      values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
      rotation: 90,
      text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: [
          'rgba(0, 105, 11, .5)',
          'rgba(10, 120, 22, .5)',
          'rgba(14, 127, 0, .5)',
          'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)',
          'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)',
          'rgba(232, 226, 202, .5)',
          'rgba(240, 230, 215, .5)',
          'rgba(255, 255, 255, 0)'
        ]
      },

      //' ' is the blank half of the circle.
      labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',' '],
      hoverinfo: 'none',
      

      hole: 0.5,
      type: 'pie',
      showlegend: false
    }
  ];

  var layout = {
    shapes: [
      {
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: { color: '850000' }
      }
    ],
    title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
    height: 400,
    width: 400,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };

  Plotly.newPlot('gauge', data, layout);
}

// Function to initialize the dropdown, bar chart, bubble chart, metadata, and gauge chart
function initialize() {
  const dropdown = d3.select('#selDataset');

  d3.json(url).then(data => {
    data.names.forEach(name => {
      dropdown.append('option').text(name).property('value', name);
    });

    const initialSample = data.samples[0];
    createBarChart(initialSample);
    createBubbleChart(initialSample);

    const initialMetadata = data.metadata[0];
    displayMetadata(initialMetadata); // Display initial metadata

    const initialWfreq = initialMetadata.wfreq; // Get initial wfreq
    createGaugeChart(initialWfreq); // Display gauge chart with initial wfreq
  });
}

// Call the initialize function to initialize the dropdown, charts, metadata, and gauge chart
initialize();

 //Call the function to create the custom gauge chart with wfreq value
function createGaugeChart(wfreq) {
  createCustomGaugeChart(wfreq);
}

// Adjusted optionChanged function to update the bar chart, bubble chart, display metadata, and gauge chart
function optionChanged(selectedValue) {
  d3.json(url).then(data => {
    const sample = data.samples.find(sample => sample.id === selectedValue);
    createBarChart(sample);
    createBubbleChart(sample);
    
    const metadata = data.metadata.find(item => item.id.toString() === selectedValue);
    displayMetadata(metadata); // Display metadata
    
    const wfreq = metadata.wfreq;
    createGaugeChart(wfreq); // Display gauge chart with wfreq value
  });
}



