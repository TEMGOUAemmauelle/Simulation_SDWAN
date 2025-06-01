import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const BandwidthChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Sample data (in a real app, this would come from your simulation)
    const data = [
      { time: 0, overlay: 75, underlay: 45 },
      { time: 1, overlay: 80, underlay: 50 },
      { time: 2, overlay: 90, underlay: 55 },
      { time: 3, overlay: 95, underlay: 60 },
      { time: 4, overlay: 85, underlay: 65 },
      { time: 5, overlay: 80, underlay: 70 },
      { time: 6, overlay: 70, underlay: 65 },
      { time: 7, overlay: 65, underlay: 60 },
      { time: 8, overlay: 75, underlay: 55 },
      { time: 9, overlay: 85, underlay: 50 },
      { time: 10, overlay: 90, underlay: 45 },
    ];
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Set up scales
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.time) || 0])
      .range([0, width]);
      
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    
    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .attr("class", "text-gray-600 dark:text-gray-400 text-xs");
    
    // Add y-axis
    g.append("g")
      .call(d3.axisLeft(y))
      .attr("class", "text-gray-600 dark:text-gray-400 text-xs");
    
    // Add y-axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "text-xs text-gray-600 dark:text-gray-400")
      .style("text-anchor", "middle")
      .text("Utilization (%)");
    
    // Add line for overlay
    const overlayLine = d3.line<{ time: number, overlay: number }>()
      .x(d => x(d.time))
      .y(d => y(d.overlay))
      .curve(d3.curveMonotoneX);
    
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#2563EB")
      .attr("stroke-width", 2)
      .attr("d", overlayLine);
    
    // Add line for underlay
    const underlayLine = d3.line<{ time: number, underlay: number }>()
      .x(d => x(d.time))
      .y(d => y(d.underlay))
      .curve(d3.curveMonotoneX);
    
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4B5563")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("d", underlayLine);
    
    // Add legend
    const legend = g.append("g")
      .attr("transform", `translate(${width - 100}, 0)`);
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#2563EB");
    
    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .attr("class", "text-xs text-gray-600 dark:text-gray-400")
      .text("Overlay");
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#4B5563");
    
    legend.append("text")
      .attr("x", 20)
      .attr("y", 37)
      .attr("class", "text-xs text-gray-600 dark:text-gray-400")
      .text("Underlay");
    
  }, []);
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm mb-2">
        <p className="font-medium">Bandwidth Utilization</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">Showing network bandwidth usage over time</p>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 border border-gray-200 dark:border-gray-700">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
    </div>
  );
};