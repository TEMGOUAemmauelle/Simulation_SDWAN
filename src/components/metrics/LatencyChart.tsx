import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const LatencyChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Sample data (in a real app, this would come from your simulation)
    const data = [
      { time: 0, voice: 25, video: 35, data: 45 },
      { time: 1, voice: 20, video: 30, data: 40 },
      { time: 2, voice: 22, video: 32, data: 42 },
      { time: 3, voice: 28, video: 38, data: 48 },
      { time: 4, voice: 30, video: 40, data: 50 },
      { time: 5, voice: 26, video: 36, data: 46 },
      { time: 6, voice: 24, video: 34, data: 44 },
      { time: 7, voice: 22, video: 32, data: 42 },
      { time: 8, voice: 24, video: 34, data: 44 },
      { time: 9, voice: 26, video: 36, data: 46 },
      { time: 10, voice: 22, video: 32, data: 42 },
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
      .domain([0, d3.max(data, d => Math.max(d.voice, d.video, d.data)) || 0])
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
      .text("Latency (ms)");
    
    // Add line for voice traffic
    const voiceLine = d3.line<{ time: number, voice: number }>()
      .x(d => x(d.time))
      .y(d => y(d.voice))
      .curve(d3.curveMonotoneX);
    
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#F97316")
      .attr("stroke-width", 2)
      .attr("d", voiceLine);
    
    // Add line for video traffic
    const videoLine = d3.line<{ time: number, video: number }>()
      .x(d => x(d.time))
      .y(d => y(d.video))
      .curve(d3.curveMonotoneX);
    
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#EF4444")
      .attr("stroke-width", 2)
      .attr("d", videoLine);
    
    // Add line for data traffic
    const dataLine = d3.line<{ time: number, data: number }>()
      .x(d => x(d.time))
      .y(d => y(d.data))
      .curve(d3.curveMonotoneX);
    
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 2)
      .attr("d", dataLine);
    
    // Add legend
    const legend = g.append("g")
      .attr("transform", `translate(${width - 100}, 0)`);
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#F97316");
    
    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .attr("class", "text-xs text-gray-600 dark:text-gray-400")
      .text("Voice");
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#EF4444");
    
    legend.append("text")
      .attr("x", 20)
      .attr("y", 37)
      .attr("class", "text-xs text-gray-600 dark:text-gray-400")
      .text("Video");
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 50)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#3B82F6");
    
    legend.append("text")
      .attr("x", 20)
      .attr("y", 62)
      .attr("class", "text-xs text-gray-600 dark:text-gray-400")
      .text("Data");
    
  }, []);
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm mb-2">
        <p className="font-medium">End-to-End Latency</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">Showing latency by traffic type</p>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 border border-gray-200 dark:border-gray-700">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
    </div>
  );
};