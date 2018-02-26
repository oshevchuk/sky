/**
 * Created by Oshevchuk on 19.02.2018.
 */
// window.THREE = THREE || {};
// window.Engine = Engine || {};
var scene;
var camera;
var controls;
var renderer;


var Engine = (function (module) {
    // var scene;
    // var camera;
    // var controls;
    // var renderer;
    var cameraTarget = new THREE.Vector3(0,100,-1000);


    module.CreateWorld = function () {
        var create = function () {
            sky.CreateSky(scene);

            var plane=new THREE.PlaneGeometry(5000,5000);
            plane.computeVertexNormals();
            // plane.computeTangents();

            var material=new THREE.MeshBasicMaterial({
                color: 0x0f110d,
                map: THREE.ImageUtils.loadTexture("textures/9451-ambientocclusion.jpg")
            });

            material.map.wrapS=THREE.RepeatWrapping;
            material.map.wrapT=THREE.RepeatWrapping;
            material.map.repeat.x=20;
            material.map.repeat.y=20;

            var  ground=new THREE.Mesh(plane, material);
            ground.rotation.x=-Math.PI/2;
            scene.add(ground);

            var aLight=new THREE.AmbientLight(0x151c0f);
            scene.add(aLight);
        };

        var animate = function () {
            requestAnimationFrame(animate);

            controls.update();
            renderer.render(scene, camera);
        };

        var init = (function () {
            if (!Detector.webgl) Detector.addGetWebGLMessage();

            scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0xabaf99, 0, 800);
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);

            controls = new THREE.OrbitControls(camera);

            camera.position.set(0, 12, 2);
            // camera.lookAt(new THREE.Vector3(0,80,-10));
            controls.target=new THREE.Vector3(0,12,10);
            // camera.rotation.x=-Math.PI/2;
            controls.update();

            renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setClearColor(0x000000, 1);
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            create();

            if (Detector.webgl) {
                animate();
            } else {
                var warning = Detector.getWebGLErrorMessage();
                document.getElementById('container').appendChild(warning);
            }

            // var script = document.createElement('script');
            // script.onload = function () {
            //     var stats = new Stats();
            //     document.body.appendChild(stats.dom);
            //     requestAnimationFrame(function loop() {
            //         stats.update();
            //         requestAnimationFrame(loop)
            //     });
            // };
            // script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
            // document.head.appendChild(script);
        })();

        var self = {
            create: create
        };
        return self;
    };
    return module;
})(Engine || {});

var pyramidGeom = new THREE.Geometry();

pyramidGeom.vertices = [  // array of Vector3 giving vertex coordinates
    new THREE.Vector3(1, 0, 1),    // vertex number 0
    new THREE.Vector3(1, 0, -1),   // vertex number 1
    new THREE.Vector3(-1, 0, -1),  // vertex number 2
    new THREE.Vector3(-1, 0, 1),   // vertex number 3
    new THREE.Vector3(0, 1, 0)     // vertex number 4
];
pyramidGeom.faceVertexUvs = [[
    [new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(1, 0)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(0.5, 1)],
    [new THREE.Vector2(1, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0.5, 1)],
    [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(0.5, 1)],
    [new THREE.Vector2(1, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0.5, 1)]
]];
pyramidGeom.uvsNeedUpdate = true;

pyramidGeom.faces = [  // array of Face3 giving the triangular faces
    new THREE.Face3(3, 2, 1),  // first half of the bottom face
    new THREE.Face3(3, 1, 0),   // second half of the bottom face
    new THREE.Face3(3, 0, 4),  // remaining faces are the four sides
    new THREE.Face3(0, 1, 4),
    new THREE.Face3(1, 2, 4),
    new THREE.Face3(2, 3, 4)
];
// var object = new THREE.Mesh( pyramidGeom, skyMaterial );
// scene.add(object);

(function () {
    Engine.CreateWorld();
})(Engine || {});

