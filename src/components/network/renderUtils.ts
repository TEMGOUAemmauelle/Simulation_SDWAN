import * as d3 from 'd3';
import { NodeType, LinkType, PacketType } from '../../types/network';

// Node icon mapping
const nodeIcons: Record<string, string> = {
  site: 'M4 21V8a2 2 0 0 1 2-2h3m10 13V8a2 2 0 0 0-2-2h-3m-9 8h12',
  router: 'M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4M13 15h8m-4-4v8',
  cloud: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'
};

// Link color mapping
const linkColors: Record<string, string> = {
  overlay: '#2563EB', // Blue
  underlay: '#4B5563', // Gray
  mpls: '#8B5CF6', // Purple
  internet: '#10B981', // Green
  lte: '#F97316'  // Orange
};

// Traffic type color mapping
const trafficColors: Record<string, string> = {
  voice: '#F97316', // Orange
  video: '#EF4444', // Red
  data: '#3B82F6', // Blue
  backup: '#8B5CF6'  // Purple
};

export const renderNodes = (
  container: d3.Selection<SVGGElement, unknown, null, undefined>,
  nodes: NodeType[]
) => {
  const nodeGroup = container
    .selectAll('.node')
    .data(nodes, (d: any) => d.id)
    .join('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`);
  
  // Add a circular background
  nodeGroup
    .append('circle')
    .attr('r', 20)
    .attr('fill', d => {
      switch (d.type) {
        case 'site': return '#DBEAFE';
        case 'router': return '#E0E7FF';
        case 'cloud': return '#F3E8FF';
        default: return '#F9FAFB';
      }
    })
    .attr('stroke', d => {
      switch (d.type) {
        case 'site': return '#2563EB';
        case 'router': return '#4F46E5';
        case 'cloud': return '#8B5CF6';
        default: return '#6B7280';
      }
    })
    .attr('stroke-width', 2)
    .attr('class', 'transition-all duration-300');
  
  // Add icon
  nodeGroup
    .append('path')
    .attr('d', d => nodeIcons[d.type] || nodeIcons.site)
    .attr('fill', 'none')
    .attr('stroke', 'currentColor')
    .attr('stroke-width', 1.5)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round')
    .attr('transform', 'translate(-12, -12) scale(1)')
    .attr('class', 'text-gray-700 dark:text-gray-300');
  
  // Add label
  nodeGroup
    .append('text')
    .attr('dy', 35)
    .attr('text-anchor', 'middle')
    .attr('class', 'text-xs font-medium text-gray-700 dark:text-gray-300 select-none')
    .text(d => d.name);
  
  return nodeGroup;
};

export const renderLinks = (
  container: d3.Selection<SVGGElement, unknown, null, undefined>,
  links: LinkType[]
) => {
  // Create a group for links
  const linkGroup = container
    .append('g')
    .attr('class', 'links');
  
  // Add links
  linkGroup
    .selectAll('.link')
    .data(links)
    .join('line')
    .attr('class', 'link')
    .attr('x1', d => {
      const source = d.source as NodeType;
      return source.x;
    })
    .attr('y1', d => {
      const source = d.source as NodeType;
      return source.y;
    })
    .attr('x2', d => {
      const target = d.target as NodeType;
      return target.x;
    })
    .attr('y2', d => {
      const target = d.target as NodeType;
      return target.y;
    })
    .attr('stroke', d => linkColors[d.type] || linkColors.overlay)
    .attr('stroke-width', d => (d.type === 'overlay' ? 3 : 2))
    .attr('stroke-dasharray', d => (d.type === 'overlay' ? '0' : '5,5'))
    .attr('opacity', 0.7);
  
  return linkGroup;
};

export const renderPackets = (
  container: d3.Selection<SVGGElement, unknown, null, undefined>,
  packets: PacketType[],
  links: LinkType[]
) => {
  // Create packet group
  const packetGroup = container
    .append('g')
    .attr('class', 'packets');
  
  // Add packets
  packetGroup
    .selectAll('.packet')
    .data(packets)
    .join('circle')
    .attr('class', 'packet')
    .attr('r', 4)
    .attr('fill', d => trafficColors[d.trafficType] || trafficColors.data)
    .attr('cx', d => {
      const link = links.find(l => l.id === d.linkId);
      if (!link) return 0;
      const source = link.source as NodeType;
      const target = link.target as NodeType;
      const progress = d.progress || 0;
      return source.x + (target.x - source.x) * progress;
    })
    .attr('cy', d => {
      const link = links.find(l => l.id === d.linkId);
      if (!link) return 0;
      const source = link.source as NodeType;
      const target = link.target as NodeType;
      const progress = d.progress || 0;
      return source.y + (target.y - source.y) * progress;
    })
    .attr('opacity', 0.8);
  
  return packetGroup;
};