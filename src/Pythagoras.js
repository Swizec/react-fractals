
import React from 'react';
import { interpolateViridis } from 'd3-scale';

const Factor = .5*Math.sqrt(2);

Math.deg = function(radians) {
  return radians * (180 / Math.PI);
};

const Pythagoras = ({ maxlvl, w, x, y, lvl, left, right }) => {
    if (lvl > maxlvl || w < 1) {
        return null;
    }

    const nextLeft = Factor*w,
          nextRight = Factor*w,
          d = nextLeft + nextRight + w,
          A = 45,
          B = 45;

    let rotate = '';

    if (left) {
        rotate = `rotate(${-A} 0 ${w})`;
    }else if (right) {
        rotate = `rotate(${B} ${w} ${w})`;
    }

    return (
        <g transform={`translate(${x} ${y}) ${rotate}`}>
            <rect width={w} height={w}
                  x={0} y={0}
                  style={{fill: interpolateViridis(lvl/maxlvl)}} />

            <Pythagoras w={nextLeft}
                        x={w-nextLeft} y={-nextLeft} lvl={lvl+1} maxlvl={maxlvl}
                        right />

            <Pythagoras w={nextRight}
                        x={0} y={-nextRight} lvl={lvl+1} maxlvl={maxlvl}
                        left />
        </g>
    );
};


export default Pythagoras;
