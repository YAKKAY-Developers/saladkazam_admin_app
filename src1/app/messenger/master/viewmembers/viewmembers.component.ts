import { Component, Input, OnInit } from '@angular/core';


import { D3Service } from "../../../shared/dataservice/d3.service";
import { SimpleDataModel } from 'src/app/shared/models/userslist';

@Component({
  selector: 'app-viewmembers',
  templateUrl: './viewmembers.component.html',
  styleUrls: ['./viewmembers.component.css']
})
export class ViewmembersComponent implements OnInit {
  private margin = { top: 10, right: 30, bottom: 30, left: 40 };
  private width = 450;
  private height = 450;
  private svg: any;
  private colors: any;
  private pie: any;
  private radius = Math.min(this.width, this.height) / 2 - this.margin.left;
  @Input("data") private data: SimpleDataModel[] = [
    { name: "Anandh", value: "9", color: "#665faac" },
    { name: "b", value: "10", color: "#dd8050c4" },
    { name: "c", value: "40", color: "#63adfeb3" },
    { name: "d", value: "8", color: "#24b044d9" },
    { name: "e", value: "12", color: "#ff516ed9" },
    { name: "f", value: "3", color: "#ffcf59ed" },
    { name: "g", value: "7", color: "#17a2b8" },
    { name: "h", value: "14", color: "#976a6af2" }
  ];
  constructor(private d3: D3Service) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit(): void {
    // this.initSvg();
    this.createSvg();
    this.createColors(this.data);
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = this.d3.d3
      .select("figure#donut")
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(data): void {
    let index = 0;
    const defaultColors = [
      "#6773f1",
      "#32325d",
      "#6162b5",
      "#6586f6",
      "#8b6ced",
      "#1b1b1b",
      "#212121"
    ];
    const colorsRange = [];
    this.data.forEach(element => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = this.d3.d3
      .scaleOrdinal()
      .domain(data.map(d => d.value.toString()))
      .range(colorsRange);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    this.pie = this.d3.d3
      .pie()
      .sort(null) // Do not sort group by size
      .value(d => {
        return d.value;
      });
    var data_ready = this.pie(this.data);

    // The arc generator
    var arc = this.d3.d3
      .arc()
      .innerRadius(this.radius * 0.5) // This is the size of the donut hole
      .outerRadius(this.radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = this.d3.d3
      .arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => this.colors(d.data.value))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Add the polylines between chart and labels:
    this.svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", d => {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    this.svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(d => {
        return d.data.name;
      })
      .attr("transform", d => {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", d => {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  }
  // initSvg() {
  //   var screenWidth = window.innerWidth;

  //   var margin = { left: 20, top: 20, right: 20, bottom: 20 },
  //     width = Math.min(screenWidth, 500) - margin.left - margin.right,
  //     height = Math.min(screenWidth, 500) - margin.top - margin.bottom;

  //   var svg = d3.select("#chart").append("svg")
  //     .attr("width", (width + margin.left + margin.right))
  //     .attr("height", (height + margin.top + margin.bottom))
  //     .append("g").attr("class", "wrapper")
  //     .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

  //   ////////////////////////////////////////////////////////////// 
  //   ///////////////////// Data &  Scales ///////////////////////// 
  //   ////////////////////////////////////////////////////////////// 

  //   //Some random data


  //   //Create a color scale
  //   this.svg = d3.select('#pipemember')
  //     .append('svg')
  //     .attr('width', '100%')
  //     .attr('height', '100%')
  //     // .attr('viewBox', '0 0 ' + Math.min(this.width, this.height) + ' ' + Math.min(this.width, this.height))
  //     .attr('viewBox', '0 0 ' + 100 + ' ' + 700)
  //     .append('g')
  //     .attr('transform', 'translate(' + Math.min(this.width, this.height) / 2 + ',' + Math.min(this.width, this.height) / 2 + ')');

  //   var colorScale = d3.scaleLinear()
  //     .domain([1, 3.5, 6])
  //     .range([0, 1, 2])
  //     .interpolate(d3.interpolateHcl);

  //   //Create an arc function   
  //   var arc = this.svg.arc()
  //     .innerRadius(width * 0.75 / 2)
  //     .outerRadius(width * 0.75 / 2 + 30);

  //   //Turn the pie chart 90 degrees counter clockwise, so it starts at the left	
  //   var pie = d3Shape.pie()
  //     .startAngle(-90 * Math.PI / 180)
  //     .endAngle(-90 * Math.PI / 180 + 2 * Math.PI)
  //     .value(function (d) { return 5; })
  //     .padAngle(.01)
  //     .sort(null);

  //   ////////////////////////////////////////////////////////////// 
  //   //////////////////// Create Donut Chart ////////////////////// 
  //   ////////////////////////////////////////////////////////////// 

  //   //Create the donut slices and also the invisible arcs for the text 
  //   svg.selectAll(".donutArcSlices")
  //     .data(pie(this.donutData))
  //     .enter().append("path")
  //     .attr("class", "donutArcSlices")
  //     .attr("d", arc)
  //     .style("fill", function (d, i) {
  //       if (i === 7) return "#CCCCCC"; //Other
  //       else return colorScale(i);
  //     })
  //     .each(function (d, i) {

  //       //A regular expression that captures all in between the start of a string (denoted by ^) and a capital letter L
  //       //The letter L denotes the start of a line segment
  //       //The "all in between" is denoted by the .+? 
  //       //where the . is a regular expression for "match any single character except the newline character"
  //       //the + means "match the preceding expression 1 or more times" (thus any single character 1 or more times)
  //       //the ? has to be added to make sure that it stops at the first L it finds, not the last L 
  //       //It thus makes sure that the idea of ^.*L matches the fewest possible characters
  //       //For more information on regular expressions see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  //       var firstArcSection = /(^.+?)L/;

  //       //Grab everything up to the first Line statement
  //       //The [1] gives back the expression between the () (thus not the L as well) which is exactly the arc statement
  //       var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
  //       //Replace all the comma's so that IE can handle it -_-
  //       //The g after the / is a modifier that "find all matches rather than stopping after the first match"
  //       newArc = newArc.replace(/,/g, " ");

  //       //Create a new invisible arc that the text can flow along
  //       svg.append("path")
  //         .attr("class", "hiddenDonutArcs")
  //         .attr("id", "donutArc" + i)
  //         .attr("d", newArc)
  //         .style("fill", "none");
  //     });

  //   //Append the label names on the outside
  //   svg.selectAll(".donutText")
  //     .data(this.donutData)
  //     .enter().append("text")
  //     .attr("class", "donutText")
  //     .attr("dy", -13)
  //     .append("textPath")
  //     .attr("startOffset", "50%")
  //     .style("text-anchor", "middle")
  //     .attr("xlink:href", function (d, i) { return "#donutArc" + i; })
  //     .text(function (d) { return 2; });
  // }
}
