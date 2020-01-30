import * as d3 from 'd3';

import { toGradient } from '../../../../util/color.js';

import { linkData } from './';

import { strokeWidth, weightGradient } from './constants.js';

export const drawLinkLines = () => {
  const layer = d3.select('#graph_link_line_layer');

  const linkLines = layer.selectAll('.graph_link_line').data(linkData);

  linkLines
    .enter()
    .append('line')
    .merge(linkLines)
    .attr('class', 'graph_link_line')
    .attr('stroke', (d) => toGradient(d.normalizedWeight, weightGradient))
    .attr(
      'stroke-width',
      (d) => (0.25 + d.normalizedWeight * 0.75) * strokeWidth * 2
    )
    .style('pointer-events', 'none');

  linkLines.exit().remove();
};

export const positionLinkLines = () => {
  const lines = d3.selectAll('.graph_link_line');

  lines.attr('x1', (d) => d.source.x);
  lines.attr('y1', (d) => d.source.y);
  lines.attr('x2', (d) => d.target.x);
  lines.attr('y2', (d) => d.target.y);
};