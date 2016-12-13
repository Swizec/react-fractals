
import React from 'react';
import { interpolateViridis } from 'd3-scale';

Math.deg = function(radians) {
  return radians * (180 / Math.PI);
};

const Pythagoras = ({ w, h, x, y, heightFactor, lean, left, right, lvl, maxlvl }) => {
    if (lvl >= maxlvl || w < 1 || h < 1) {
        return null;
    }

    const trigH = heightFactor*w,
          nextRight = Math.sqrt(trigH**2 + (w * (.5+lean))**2),
          nextLeft = Math.sqrt(trigH**2 + (w * (.5-lean))**2),
          nextHeight = .8*h,
          A = Math.deg(Math.atan(trigH / ((.5-lean) * w))),
          B = Math.deg(Math.atan(trigH / ((.5+lean) * w)));

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
                         x={0} y={-nextHeight}
                         lvl={lvl+1} maxlvl={maxlvl}
                         heightFactor={heightFactor}
                         lean={lean}
                         left />

            <Pythagoras w={nextRight} h={nextHeight}
                        x={w-nextRight} y={-nextHeight}
                        lvl={lvl+1} maxlvl={maxlvl}
                        heightFactor={heightFactor}
                        lean={lean}
                        right />

        </g>
    );
};
export default Pythagoras;
