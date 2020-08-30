
//Dashboard
init();

function init(){
    
    var selector_space = d3.select("#selDataset");


    d3.json("samples.json").then((content)=>{

        var names_samples = content.names;
        names_samples.forEach((entry)=>{
        selector_space.append("option").text(entry).property("value",entry);

        });  
    });

    var first_entry =  name_samples[0];
    Metadata(first_entry);
    Charts(first_entry);

    
}

function Changed(newSample) {
    Charts(newSample);
    Metadata(newSample);
  }
  

//Metadata

function Metadata(sample_to_read){
    var selector_panel = d3.select("#sample-metadata");

    d3.json("samples.json").then((content)=>{
        var meta_samples = content.metadata;
        var Meta_filtered = meta_samples.filter(data_point => data_point.id == sample_to_read);
        var Meta_filtered_out = Meta_filtered[0];

        selector_panel.html("");
    
        Object.entries(Meta_filtered_out).forEach(([key,value]) =>{
            selector_panel.append("h5").text(`${key}: ${value}`);

        });

     });
}

//Charts

function Charts(sample_to_read){

    d3.json("samples.json").then((content)=>{
        
        var sample_samples = content.samples;
        var samples_filtered = sample_samples.filter(data_point => data_point.id == sample_to_read);
        var samples_filtered_out = samples_filtered[0];

        var ids = samples_filtered_out.otu_ids;
        var labels = samples_filtered_out.otu_labels;
        var values = samples_filtered_out.sample_values;

            //Bar

        var yticks = ids.slice(0, 10).map(ID => `${ID}`).reverse();
        var BarData = [
        {
            y: yticks,
            x: values.slice(0, 10).reverse(),
            text: lasbels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }
        ];

        var Bar = {
        title: "Bacteria Top 10",
        margin: { t: 20, l: 130 }
        };

        Plotly.newPlot("bar", BarData, BarLayout);
    


        //Bubble

        var BubbleLayout = {
            margin: { t: 0 },
            hovermode: "closests",
            xaxis: { title: "ID"}
        };


        var BubbleChartData = [{
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: ids,
                colorscale: "Picnic"
            }
            }];


        Plotly.newPlot("bubble", BubbleChartData, BubbleLayout);
      
    });
    
    


    
}






