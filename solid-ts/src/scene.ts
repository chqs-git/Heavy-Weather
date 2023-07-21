import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


export function setupScene(width: number, height: number) {
    // setup scene
    const scene = new Three.Scene();
    scene.background = new Three.Color(0x7DA582)
    const ratio = width / height;
    const camera = new Three.PerspectiveCamera(45, ratio, 0.1, 1000);
    const renderer = new Three.WebGLRenderer();
    camera.position.z = 5;
    renderer.setSize(width, height);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    document.body.appendChild(renderer.domElement);

    // create & add primitives to the scene
    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial( {color: 0xC1C1C1 } );
    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);
    
    // animate scene
    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }
    animate();
}