
import React from 'react';
import { interpolateViridis } from 'd3-scale';

Math.deg = function(radians) {
  return radians * (180 / Math.PI);
};

const Pythagoras = ({ maxlvl, w, h, x, y, lvl, left, right }) => {
    if (lvl > maxlvl || w < 1) {
        return null;
    }

    const trigH = .3*w,
          nextRight = Math.sqrt(trigH**2 + (w * .4)**2),
          nextLeft = Math.sqrt(trigH**2 + (w * .6)**2),
          nextHeight = .9*h,
          A = Math.deg(Math.atan(trigH / (.6 * w))),
          B = Math.deg(Math.atan(trigH / (.4 * w)));

    let rotate = '';

    if (left) {
        rotate = `rotate(${-A} 0 ${h})`;
    }else if (right) {
        rotate = `rotate(${B} ${w} ${h})`;
    }

    return (
        <g transform={`translate(${x} ${y}) ${rotate}`}>
            <rect width={w} height={h}
                  x={0} y={0}
                  style={{fill: interpolateViridis(lvl/maxlvl)}} />

             <Pythagoras w={nextLeft} h={nextHeight}
                         x={0} y={-nextHeight} lvl={lvl+1} maxlvl={maxlvl}
                         left />

            <Pythagoras w={nextRight} h={nextHeight}
                        x={w-nextRight} y={-nextHeight} lvl={lvl+1} maxlvl={maxlvl}
                        right />

        </g>
    );
};
export default Pythagoras;
