
import React from 'react';
import { interpolateViridis } from 'd3-scale';

const MaxLVL = 10,
      Factor = .5*Math.sqrt(2);

const Pythagoras = ({ ang, w, x, y, lvl, left, right }) => {
    if (lvl > MaxLVL) {
        return null;
    }

    const nextSide = w*Factor;

    let rotate = '';

    if (left) {
        rotate = `rotate(${-ang} 0 ${w})`;
    }else if (right) {
        rotate = `rotate(${ang} ${w} ${w})`;
    }

    return (
        <g transform={`translate(${x} ${y}) ${rotate}`}>
            <rect width={w} height={w}
                  x={0} y={0}
                  style={{fill: interpolateViridis(lvl/MaxLVL)}} />

            <Pythagoras ang={ang} w={nextSide}
                        x={w-nextSide} y={-nextSide} lvl={lvl+1}
                        right />

            <Pythagoras ang={ang} w={nextSide}
                        x={0} y={-nextSide} lvl={lvl+1}
                        left />
        </g>
    );
};


export default Pythagoras;
