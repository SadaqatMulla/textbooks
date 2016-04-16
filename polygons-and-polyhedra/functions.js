// =============================================================================
// Mathigon | Polygons and Polyhedra Functions
// (c) 2016 Mathigon
// =============================================================================


import { $, $$ } from 'elements';
import Draggable from 'draggable';
import { angle } from 'geometry';


// -----------------------------------------------------------------------------
// Biographies

export const bio = { };


// -----------------------------------------------------------------------------
// Glossary

export const gloss = { };


// -----------------------------------------------------------------------------
// Hints

export const hints = { };


// -----------------------------------------------------------------------------
// Shared Utilities and Classes

function normalise(v) {
    let l = Math.sqrt(v.x * v.x + v.y * v.y);
    return { x: v.x/l, y: v.y/l };
}

function pointAtX(a, b, x) {
    let slope = (b.y - a.y) / (b.x - a.x);
    let y = a.y + (x - a.x) * slope;
    return { x, y };
}

function svgAngle(a, b, c, size) {
    let ab = normalise({ x: b.x - a.x, y: b.y - a.y });
    let ac = normalise({ x: c.x - a.x, y: c.y - a.y });

    let orient = a.x * (c.y - b.y) + b.x * (a.y - c.y) + c.x * (b.y - a.y);

    b = { x: a.x + ab.x * size, y: a.y + ab.y * size };
    c = { x: a.x + ac.x * size, y: a.y + ac.y * size };

    return ['M'+a.x,a.y+'L'+b.x,b.y+'A'+size,size,0,0,(orient<0?1:0),c.x,c.y+'Z'].join(',');
}

function svgCorrespondingAngle(a, b, c, size, s) {
    return svgAngle(s, { x: b.x+s.x-a.x, y: b.y+s.y-a.y }, { x: c.x+s.x-a.x, y: c.y+s.y-a.y }, size);
}

function svgOppositeAngle(a, b, c, size) {
    return svgAngle(a, { x: 2*a.x-c.x, y: 2*a.y-c.y }, { x: 2*a.x-b.x, y: 2*a.y-b.y }, size);
}

function svgLine(a, b) {
    let p = pointAtX(a, b, -10);
    let q = pointAtX(a, b, 800);
    return 'M' + p.x + ',' + p.y + 'L' + q.x + ',' + q.y;
}

function svgLineThrough(a, b, c) {
    return svgLine(c, { x: c.x + b.x - a.x, y: c.y + b.y - a.y });
}

function svgSegment(a, b) {
    return 'M' + a.x + ',' + a.y + 'L' + b.x + ',' + b.y;
}

function deg(angle) {
    angle = angle * 180 / Math.PI;
    return Math.round(Math.min(angle, 360-angle));
}


// -----------------------------------------------------------------------------
// Functions

const fns = {};

fns.triangles = function(section) {
    section.model.load({ angle, svgAngle, svgLine, svgSegment, deg });

    let initial = [{ x: 160, y: 70 }, { x: 500, y: 180 }, { x: 110, y: 320 }];
    let $geopad = section.$el.find('.geopad');

    section.$el.findAll('.geo-vertex').forEach(function($v, i) {
        let drag = new Draggable($v, $geopad);
        drag.on('move', e => { section.model.set('abc'[i], e); });
        drag.position = initial[i];
    });
};

fns.triangleProof = function(section) {
    section.model.load({ angle, svgAngle, svgLine, svgLineThrough, svgCorrespondingAngle,
        svgOppositeAngle, svgSegment, deg });

    let initial = [{ x: 100, y: 80 }, { x: 250, y: 300 }, { x: 50, y: 300 }];
    let $geopad = section.$el.find('.geopad');

    section.$el.findAll('.geo-vertex').forEach(function($v, i) {
        let drag = new Draggable($v, $geopad);
        drag.on('move', e => { section.model.set('abc'[i], e); });
        drag.position = initial[i];
    });
};


fns.quadrilateral = function(section) {
    section.model.load({ angle, svgAngle, svgLine, svgSegment, deg });

    let initial = [{ x: 160, y: 70 }, { x: 500, y: 180 }, { x: 110, y: 320 }, { x: 200, y: 200 }];
    let $geopad = section.$el.find('.geopad');

    section.$el.findAll('.geo-vertex').forEach(function($v, i) {
        let drag = new Draggable($v, $geopad);
        drag.on('move', e => { section.model.set('abcd'[i], e); });
        drag.position = initial[i];
    });
};

export const sections = fns;
