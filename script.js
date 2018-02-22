/**
 * Created by Oshevchuk on 19.02.2018.
 */

var scene=new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// var renderer = new THREE.WebGLRenderer({antialias:true});
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// var skyTexture=new THREE.ImageUtils.loadTexture('skymap_photo8.jpg');
var skyTexture=new THREE.ImageUtils.loadTexture('sky_photo_cgi.jpg');
skyTexture.repeat.set(1,1);
var skyMaterial=new THREE.MeshBasicMaterial({map: skyTexture, side: THREE.doubleSided});


var geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry1, skyMaterial );
scene.add( cube );

camera.position.z = 20;

// var floorGeometry=new THREE.PlaneGeometry(100,100,10,10);
// var floor=new THREE.Mesh(skyMaterial,  floorGeometry);
// floor.position.y=0;
// floor.position.x=1;
// scene.add(floor);
var floorGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
var floor = new THREE.Mesh(floorGeometry, skyMaterial);
floor.position.y = -0.5;
// floor.rotation.x = Math.PI / 2;
// scene.add(floor);

var pyramidGeom = new THREE.Geometry();

pyramidGeom.vertices = [  // array of Vector3 giving vertex coordinates
    new THREE.Vector3( 1, 0, 1 ),    // vertex number 0
    new THREE.Vector3( 1, 0, -1 ),   // vertex number 1
    new THREE.Vector3( -1, 0, -1 ),  // vertex number 2
    new THREE.Vector3( -1, 0, 1 ),   // vertex number 3
    new THREE.Vector3( 0, 1, 0 )     // vertex number 4
];
pyramidGeom.faceVertexUvs = [[
    [ new THREE.Vector2(0,0), new THREE.Vector2(0,1), new THREE.Vector2(1,1) ],
    [ new THREE.Vector2(0,0), new THREE.Vector2(1,1), new THREE.Vector2(1,0) ],
    [ new THREE.Vector2(0,0), new THREE.Vector2(1,0), new THREE.Vector2(0.5,1) ],
    [ new THREE.Vector2(1,0), new THREE.Vector2(0,0), new THREE.Vector2(0.5,1) ],
    [ new THREE.Vector2(0,0), new THREE.Vector2(1,0), new THREE.Vector2(0.5,1) ],
    [ new THREE.Vector2(1,0), new THREE.Vector2(0,0), new THREE.Vector2(0.5,1) ]
]];
pyramidGeom.uvsNeedUpdate=true;

pyramidGeom.faces = [  // array of Face3 giving the triangular faces
    new THREE.Face3( 3, 2, 1 ),  // first half of the bottom face
    new THREE.Face3( 3, 1, 0 ),   // second half of the bottom face
    new THREE.Face3( 3, 0, 4 ),  // remaining faces are the four sides
    new THREE.Face3( 0, 1, 4 ),
    new THREE.Face3( 1, 2, 4 ),
    new THREE.Face3( 2, 3, 4 )
];
var object = new THREE.Mesh( pyramidGeom, skyMaterial );
scene.add(object);


var sky=new THREE.Geometry();
var radius=8;
var re_radius=8;
var n=20;
var step=Math.PI*2/n;
// var sky_vertices=[];
// var uv_faces=[];
var faces=[];

for(var alpha=0, i=0; i<n; alpha+=Math.PI/2/n, i++, radius-=re_radius/4) {
    var z0=Math.sin(alpha)*re_radius;
    var z1=Math.sin(alpha+Math.PI/2/n)*re_radius;
    radius=Math.cos(alpha)*re_radius;
    var radius_next=Math.cos(alpha+Math.PI/2/n)*re_radius;
    var ty=i/n;
    var ty1=(i+1)/n;

    for (var angle = 0, j = i*4*n; angle < Math.PI * 2; angle += step, j += 4) {
        var x0 = Math.sin(angle) * radius;
        var x0_ = Math.sin(angle) * radius_next;
        var x1 = Math.sin(angle + step) * radius;
        var x1_ = Math.sin(angle + step) * radius_next;

        var y0 = Math.cos(angle) * radius;
        var y0_ = Math.cos(angle) * radius_next;
        var y1 = Math.cos(angle + step) * radius;
        var y1_ = Math.cos(angle + step) * radius_next;

        var tx = angle / Math.PI / 2;
        var tx_next = (angle + step) / Math.PI / 2;

        sky.vertices.push(new THREE.Vector3(x0, y0, z0));
        sky.vertices.push(new THREE.Vector3(x1, y1, z0));
        sky.vertices.push(new THREE.Vector3(x1_, y1_, z1));
        sky.vertices.push(new THREE.Vector3(x0_, y0_, z1));

        sky.faces.push(new THREE.Face3(j, j + 1, j + 2));
        sky.faces.push(new THREE.Face3(j + 2, j + 1, j));
        sky.faces.push(new THREE.Face3(j, j + 2, j + 3));
        sky.faces.push(new THREE.Face3(j + 3, j + 2, j));

        sky.faceVertexUvs[0].push(new Array(new THREE.Vector2(tx, ty), new THREE.Vector2(tx_next, ty), new THREE.Vector2(tx_next, ty1)));
        sky.faceVertexUvs[0].push(new Array(new THREE.Vector2(tx_next, ty1), new THREE.Vector2(tx_next, ty), new THREE.Vector2(tx, ty)));
        sky.faceVertexUvs[0].push(new Array(new THREE.Vector2(tx, ty), new THREE.Vector2(tx_next, ty1), new THREE.Vector2(tx, ty1)));
        sky.faceVertexUvs[0].push(new Array(new THREE.Vector2(tx, ty1), new THREE.Vector2(tx_next, ty1), new THREE.Vector2(tx, ty)));
        console.log(i, j, angle);
    }
}

var squareMaterial = new THREE.MeshBasicMaterial({
    color:0xFFFFFF,
    side:THREE.DoubleSide
});

var squareMesh = new THREE.Mesh(sky, skyMaterial);
squareMesh.position.set(1.5, 0.0, 4.0);
squareMesh.rotation.x=-Math.PI/2;
squareMesh.scale.x=25;
squareMesh.scale.y=25;
squareMesh.scale.z=55;

scene.add(squareMesh);


var animate=function () {
    requestAnimationFrame(animate);
    cube.rotation.x+=0.01;
    cube.rotation.y+=0.001;

    renderer.render(scene, camera);
};

animate();