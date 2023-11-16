import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { setupShader } from "./setupShader";
import { createEffect, Accessor } from 'solid-js';
import { Cloud } from "../domain/cloud/cloud.ts";
import { CloudGenerator } from "./generators/cloudFill/cloudFill";
import { VoxelMaptoTexture } from "./utils/toTexture.ts";

export function Scene(props: {width: number, height: number, cloud: Accessor<Cloud>}) {
    const { width, height, cloud} = props;
    // setup scene
    const scene = new Three.Scene();
    scene.background = new Three.Color(0x7DA582)
    const ratio = width / height;
    const camera = new Three.PerspectiveCamera(45, ratio, 0.1, 1000);
    const renderer = new Three.WebGLRenderer();
    camera.position.z = 2;
    renderer.setSize(width, height);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;

    // raymarching clouds: post-process pass 
    const cloudTex = VoxelMaptoTexture(CloudGenerator());
    const blueNoiseTex = new Three.TextureLoader().load('./resources/BlueNoise.png');
    setupShader(renderer, scene, camera, new Three.Vector2(width, height), 1.0, 2.0, cloud(), cloudTex, blueNoiseTex);
    
    // animate scene
    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }
    animate();

    return renderer.domElement;
}
