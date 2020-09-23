var getGrade = function(student)
{
    return student.grade;
}

var setBanner = function(msg){
    d3.select("#banner")
    .text(msg);
}

var drawPlot1 = function(penguins, screen, xScale, yScale)
{   
    d3.select("#plot")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cy", function(penguin){
        return yScale(d3.mean(penguin.homework.map(getGrade)).toFixed(2));
    })
    .attr("cx", function(penguin){
        return xScale(penguin.final.map(getGrade));
    })
    .attr("r", 5)
    .on("mouseenter", function(penguin){
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top", yPos+"px")
        .style("left", xPos+"px")
        
        d3.select("#final")
        .text("Final Grade:" + " " + penguin.final.map(getGrade));
        
        d3.select("#homework")
        .text("Mean HW Grade:" + " " + d3.mean(penguin.homework.map(getGrade)).toFixed(2));
        
        d3.select("#image")
        .append("img")
        .attr("src", "imgs/"+penguin.picture);})
    .on("mouseleave", function(){
        d3.select("#tooltip")
        .classed("hidden", true)
        
        d3.select("#image")
        .selectAll("img")
        .remove();
    })
}

var drawPlot2 = function(penguins, screen, xScale, yScale)
{   
    d3.select("#plot")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx", function(penguin){
        return xScale(d3.mean(penguin.homework.map(getGrade)).toFixed(2));
    })
    .attr("cy", function(penguin){
        return yScale(10*d3.mean(penguin.quizes.map(getGrade)));
    })
    .attr("r", 5)
    .on("mouseenter", function(penguin){
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top", yPos+"px")
        .style("left", xPos+"px")
        
        d3.select("#final")
        .text("Final Grade:" + " " + penguin.final.map(getGrade));
        
        d3.select("#homework")
        .text("Mean HW Grade:" + " " + d3.mean(penguin.homework.map(getGrade)).toFixed(2));
        
        d3.select("#image")
        .append("img")
        .attr("src", "imgs/"+penguin.picture);})
    .on("mouseleave", function(){
        d3.select("#tooltip")
        .classed("hidden", true)
        
        d3.select("#image")
        .selectAll("img")
        .remove();
    });
}


        
var initPlot = function(penguins)
{
 setBanner("Final Grade vs. Mean Quiz Grade")
    var screen = {height:600, width:600}
    
    d3.select("#plot")
    .attr("height", screen.height)
    .attr("width", screen.width)
    
    var xScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,screen.width])
    
    var yScale = d3.scaleLinear()
    .domain([0,100])
    .range([screen.height, 0])
    
    drawPlot1(penguins, screen, xScale, yScale)
    
    d3.select("#FinalandHW")
    .on("click", function(){
        d3.select("#plot")
        .selectAll("circle")
        .remove()
        
    setBanner("Final Grade vs. Mean Quiz Grade")
    
    drawPlot1(penguins, screen, xScale, yScale);
    })
    
    d3.select("#HWandQuiz")
    .on("click", function(){
        d3.select("#plot")
        .selectAll("circle")
        .remove()
        
    setBanner("Mean HW Grade vs. Mean Quiz Grade")
        
    drawPlot2(penguins, screen, xScale, yScale);
    })
}
    

    
    
var successFcn = function(penguins)
{
    console.log("Data retrieved", penguins);
    initPlot(penguins);
}
var failureFcn = function(error)
{
    console.log("Failed to retrieve data", error);
}
var penguinScatter = d3.json("classData.json")
penguinScatter.then(successFcn, failureFcn)