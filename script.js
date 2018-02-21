/**
 * Created by Oshevchuk on 19.02.2018.
 */

var scene=new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var skyTexture=new THREE.ImageUtils.loadTexture('sky_sunbeams1.jpg');
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
var radius=13;
var n=10;
var step=Math.PI*2/n;
var sky_vertices=[];
var uv_faces=[];
var faces=[];

for(var i=0, j=0; i<Math.PI*2; i+=step, j+=3){
    var x=Math.sin(i)*radius;
    var y=Math.cos(i)*radius;
    var z=0;
    var z_up=4;
    var x1=Math.sin(i+step)*radius;
    var y1=Math.cos(i+step)*radius;
    var z1=0;
    //------------------
    sky.vertices.push(
      new THREE.Vector3(x, y, z)
    );

    sky.vertices.push(
      new THREE.Vector3(x, y, z_up)
    );
    sky.vertices.push(
        new THREE.Vector3(x1, y1, z)
    );
    //------------------
    sky.faces.push(
        new THREE.Face3(j, j+1, j+2)
    )
    sky.faces.push(
        new THREE.Face3(j+2, j+1, j)
    )
//
    sky.faceVertexUvs[0].push(new Array( new THREE.Vector2(1,0), new THREE.Vector2(1,1), new THREE.Vector2(0,0)));
    sky.faceVertexUvs[0].push(new Array( new THREE.Vector2(1,1), new THREE.Vector2(0,0), new THREE.Vector2(1,0)));
    // sky.faceVertexUvs[0].push(new Array( new THREE.Vector2(0,0), new THREE.Vector2(0,1), new THREE.Vector2(1,1)));
    // pyramidGeom.faceVertexUvs[0].push(new Array( new THREE.Vector2(0.5,0.5), new THREE.Vector2(1,0), new THREE.Vector2(1,1)));
}

for(var i=0, j=30; i<Math.PI*2; i+=step, j+=3){
    var x=Math.sin(i)*radius;
    var y=Math.cos(i)*radius;
    var z=4;

    var x1=Math.sin(i+step)*radius;
    var y1=Math.cos(i+step)*radius;
    var z1=4;
    //------------------
    sky.vertices.push(
        new THREE.Vector3(x, y, z)
    );
    sky.vertices.push(
        new THREE.Vector3(x1, y1, z1)
    );
    sky.vertices.push(
        new THREE.Vector3(x1, y1, 0)
    );


    //------------------
    sky.faces.push(
        new THREE.Face3(j+2, j+1, j)
    );
    sky.faces.push(
        new THREE.Face3(j, j+1, j+2)
    );

//
    sky.faceVertexUvs[0].push(new Array( new THREE.Vector2(0,1), new THREE.Vector2(1,1), new THREE.Vector2(1,0)));
    // sky.faceVertexUvs[0].push(new Array( new THREE.Vector2(0,1), new THREE.Vector2(1,1), new THREE.Vector2(1,0)));
    // pyramidGeom.faceVertexUvs[0].push(new Array( new THREE.Vector2(0.5,0.5), new THREE.Vector2(1,0), new THREE.Vector2(1,1)));
}

// var ob=new THREE.Mesh(sky, material);
var ob=new THREE.Mesh(sky, skyMaterial);
ob.rotation.x=Math.PI/2;
scene.add(ob);

var animate=function () {
    requestAnimationFrame(animate);
    cube.rotation.x+=0.01;
    cube.rotation.y+=0.001;

    renderer.render(scene, camera);
};

animate();