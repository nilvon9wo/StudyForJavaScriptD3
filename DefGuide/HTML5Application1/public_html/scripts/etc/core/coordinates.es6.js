function polar(point){
    let x = point.x;
    let y = point.y;
    return [Math.sqrt(x*x+y*y), Math.atan2(y,x)];
}

function cartesian(radius, theta){
    return [radius * Math.cos(theta), radius * Math.sin(theta)];
}

let [radius, theta] = polar(new Point(1,1));
console.log('[radius, theta]', [radius, theta]);
let [px5, py5] = cartesian (radius, theta);
console.log('[px5, py5]', [px5, py5]);