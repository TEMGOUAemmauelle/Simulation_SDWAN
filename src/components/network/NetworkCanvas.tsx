import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useNetworkStore } from '../../stores/networkStore';
import { useSimulationStore } from '../../stores/simulationStore';
import { NodeType, LinkType } from '../../types/network';
import { renderNodes, renderLinks, renderPackets } from './renderUtils';

export const NetworkCanvas: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { nodes, links, addNode, updateNodePosition, selectNode } = useNetworkStore();
  const { isRunning, packets } = useSimulationStore();
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render
    
    // Create the main group for zoom/pan
    const g = svg.append("g");
    
    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
      
    svg.call(zoom);
    
    // Enable drag and drop of nodes
    const drag = d3.drag<SVGGElement, NodeType>()
      .on("start", function(event, d) {
        event.sourceEvent.stopPropagation(); // Prevent zoom while dragging
        d3.select(this).classed("dragging", true);
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", function(event, d) {
        d.fx = event.x;
        d.fy = event.y;
        d3.select(this)
          .attr("transform", `translate(${event.x},${event.y})`);
        
        // Update connected links
        svg.selectAll(".link")
          .filter(l => (l as any).source.id === d.id || (l as any).target.id === d.id)
          .attr("x1", l => ((l as any).source.id === d.id ? event.x : (l as any).source.x))
          .attr("y1", l => ((l as any).source.id === d.id ? event.y : (l as any).source.y))
          .attr("x2", l => ((l as any).target.id === d.id ? event.x : (l as any).target.x))
          .attr("y2", l => ((l as any).target.id === d.id ? event.y : (l as any).target.y));
      })
      .on("end", function(event, d) {
        d3.select(this).classed("dragging", false);
        updateNodePosition(d.id, event.x, event.y);
        d.fx = null;
        d.fy = null;
      });
    
    // Render links first (so they're behind nodes)
    renderLinks(g, links);
    
    // Render nodes and enable drag
    const nodeElements = renderNodes(g, nodes);
    nodeElements.call(drag as any);
    
    // Add click handler for node selection
    nodeElements.on("click", (event, d) => {
      event.stopPropagation();
      selectNode(d.id);
    });
    
    // If simulation is running, render packets
    if (isRunning) {
      renderPackets(g, packets, links);
    }
    
    // Allow double-click to add a new node
    svg.on("dblclick", (event) => {
      const [x, y] = d3.pointer(event);
      const transform = d3.zoomTransform(svg.node() as Element);
      const realX = (x - transform.x) / transform.k;
      const realY = (y - transform.y) / transform.k;
      
      addNode({
        id: `node-${Date.now()}`,
        type: 'site',
        x: realX,
        y: realY,
        name: 'New Site',
        properties: {}
      });
    });
    
    // Center the view on first render if nodes exist
    if (nodes.length > 0 && !isRunning) {
      const bounds = nodeElements.nodes().reduce((bounds, node) => {
        const bbox = node.getBBox();
        return {
          x: Math.min(bounds.x, bbox.x),
          y: Math.min(bounds.y, bbox.y),
          width: Math.max(bounds.width, bbox.x + bbox.width),
          height: Math.max(bounds.height, bbox.y + bbox.height)
        };
      }, { x: Infinity, y: Infinity, width: -Infinity, height: -Infinity });
      
      const dx = bounds.width - bounds.x;
      const dy = bounds.height - bounds.y;
      const x = (bounds.x + bounds.width) / 2;
      const y = (bounds.y + bounds.height) / 2;
      const scale = 0.9 / Math.max(dx / width, dy / height);
      const translate = [width / 2 - scale * x, height / 2 - scale * y];
      
      svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity
          .translate(translate[0], translate[1])
          .scale(scale));
    }
    
  }, [nodes, links, packets, isRunning, addNode, updateNodePosition, selectNode]);
  
  return (
    <svg 
      ref={svgRef} 
      className="w-full h-full bg-gray-50 dark:bg-gray-900 cursor-grab active:cursor-grabbing"
      data-testid="network-canvas"
    />
  );
};