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
    orientation: 'h'
  };

  const layout = {
    title: 'Top 10 OTUs Found in Individual',
    xaxis: { title: 'Sample Values' },
    yaxis: { title: 'OTU IDs' }
  };

  const chartData = [trace];

  Plotly.newPlot('bar', chartData, layout);
}

// Function to handle dropdown change event
function optionChanged(selectedValue) {
  d3.json(url).then(data => {
    const sample = data.samples.find(sample => sample.id === selectedValue);
    createBarChart(sample);
  });
}

// Function to initialize the dropdown
function init() {
  const dropdown = d3.select('#selDataset');

  d3.json(url).then(data => {
    data.names.forEach(name => {
      dropdown.append('option').text(name).property('value', name);
    });

    const initialSample = data.samples[0];
    createBarChart(initialSample);
  });
}

// Call the init function to initialize the dropdown and chart
init();

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
  
  // Adjusted optionChanged function to update the bubble chart
  function optionChanged(selectedValue) {
    d3.json(url).then(data => {
      const sample = data.samples.find(sample => sample.id === selectedValue);
      createBarChart(sample);
      createBubbleChart(sample); // Call the function to update the bubble chart
    });
  }
  
  // Adjusted init function to initially render the bubble chart
  function init() {
    const dropdown = d3.select('#selDataset');
  
    d3.json(url).then(data => {
      data.names.forEach(name => {
        dropdown.append('option').text(name).property('value', name);
      });
  
      const initialSample = data.samples[0];
      createBarChart(initialSample);
      createBubbleChart(initialSample); // Call the function to initially render the bubble chart
    });
  }
  
  // Call the init function to initialize the dropdown, bar chart, and bubble chart
  init();

// Function to display sample metadata
function displayMetadata(metadata) {
    const metadataDiv = d3.select('#sample-metadata');
    metadataDiv.html(''); // Clear previous content
  
    Object.entries(metadata).forEach(([key, value]) => {
      metadataDiv.append('p').text(`${key}: ${value}`);
    });
  }
  
  // Adjusted optionChanged function to update the bar chart, bubble chart, and display metadata
  function optionChanged(selectedValue) {
    d3.json(url).then(data => {
      const sample = data.samples.find(sample => sample.id === selectedValue);
      createBarChart(sample);
      createBubbleChart(sample);
      
      const metadata = data.metadata.find(item => item.id.toString() === selectedValue);
      displayMetadata(metadata); // Display metadata
    });
  }
  
  // Adjusted init function to initially render the bar chart, bubble chart, and display initial metadata
  function init() {
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
    });
  }
  
  // Call the init function to initialize the dropdown, bar chart, bubble chart, and display initial metadata
  init();
  
// Function to create the gauge chart
function createGaugeChart(wfreq) {
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 1], color: "rgba(0, 105, 11, .1)" },
            { range: [1, 2], color: "rgba(0, 105, 11, .3)" },
            { range: [2, 3], color: "rgba(0, 105, 11, .5)" },
            { range: [3, 4], color: "rgba(0, 105, 11, .7)" },
            { range: [4, 5], color: "rgba(0, 105, 11, .9)" },
            { range: [5, 6], color: "rgba(0, 105, 11, .9)" },
            { range: [6, 7], color: "rgba(0, 105, 11, .9)" },
            { range: [7, 8], color: "rgba(0, 105, 11, .9)" },
            { range: [8, 9], color: "rgba(0, 105, 11, 1)" }
          ],
        }
      }
    ];
  
    var layout = { width: 500, height: 400, margin: { t: 20, b: 40, l: 40, r: 40 } };
  
    Plotly.newPlot('gauge', data, layout);
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
      createGaugeChart(wfreq); // Display gauge chart
    });
  }
  
  // ... (Rest of the code remains unchanged)
  

  