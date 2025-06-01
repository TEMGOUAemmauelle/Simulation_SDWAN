import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const PacketLossChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Sample data (in a real app, this would come from your simulation)
    const data = [
      { link: "Link 1", loss: 0.5 },
      { link: "Link 2", loss: 0.2 },
      { link: "Link 3", loss: 1.5 },
      { link: "Link 4", loss: 0.3 },
      { link: "Link 5", loss: 0.8 },
      { link: "Link 6", loss: 0.1 },
    ];
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const margin = { top: 20, right: 30, bottom: 60, left: 50 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Set up scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.link))
      .range([0, width])
      .padding(0.3);
      
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.loss) || 0])
      .range([height, 0])
      .nice();
    
    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr("class", "text-gray-600 dark:text-gray-400 text-xs")
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");
    
    // Add y-axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + "%"))
      .attr("class", "text-gray-600 dark:text-gray-400 text-xs");
    
    // Add y-axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "text-xs text-gray-600 dark:text-gray-400")
      .style("text-anchor", "middle")
      .text("Packet Loss (%)");
    
    // Add bars
    g.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.link) || 0)
      .attr("y", d => y(d.loss))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.loss))
      .attr("fill", d => {
        if (d.loss < 0.5) return "#10B981"; // Green for good
        if (d.loss < 1.0) return "#FBBF24"; // Yellow for warning
        return "#EF4444"; // Red for bad
      });
    
    // Add value labels on top of bars
    g.selectAll(".label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("x", d => (x(d.link) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.loss) - 5)
      .attr("text-anchor", "middle")
      .attr("class", "text-xs text-gray-600 dark:text-gray-400 font-medium")
      .text(d => d.loss + "%");
    
  }, []);
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm mb-2">
        <p className="font-medium">Packet Loss by Link</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">Showing percentage of packets lost on each link</p>
      </div>
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 border border-gray-200 dark:border-gray-700">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
    </div>
  );
};