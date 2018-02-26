

var sky=(function (module) {
    module.CreateSky=function (mScene) {
        var scene=mScene;

        var create=function () {

            var sky=new THREE.Geometry();
            var radius=8;
            var re_radius=8;
            var n=20;
            var step=Math.PI*2/n;

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
                    // console.log(i, j, angle);
                }
            }

            var squareMaterial = new THREE.MeshBasicMaterial({
                color:0xFFFFFF,
                side:THREE.DoubleSide
            });

            var skyTexture=new THREE.ImageUtils.loadTexture('sky_photo_cgi.jpg');
            skyTexture.repeat.set(1,1);
            var skyMaterial=new THREE.MeshBasicMaterial({map: skyTexture, side: THREE.doubleSided});

            var squareMesh = new THREE.Mesh(sky, skyMaterial);
            squareMesh.position.set(1.5, 0.0, 4.0);
            squareMesh.rotation.x=-Math.PI/2;
            squareMesh.scale.x=60;
            squareMesh.scale.y=60;
            squareMesh.scale.z=15;

            scene.add(squareMesh);

        };

        var init=(function () {
            create();
        })();
        var self={
            create:create
        };
        return self;
    };
    return module;
})(sky || {});