import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { cloudRaymarcher } from "../shaders/cloud/cloud_raymarcher";
import { Cloud } from "./cloud/cloud";
import { Vector2, Vector3, Data3DTexture, Texture } from "three";

export function setupShader(
    renderer: THREE.WebGLRenderer, 
    scene: THREE.Scene, 
    camera: THREE.Camera,
    dimensions: Vector2,
    boundsMin: number,
    boundsMax: number,
    cloud: Cloud,
    cloudTexture: Data3DTexture,
    blueNoiseTex: Texture
    ) {
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // setup raymarcher shader
    const boxPosition = new Vector3(1.0, 1.0, 1.0);
    const shaderMat = cloudRaymarcher(camera.position, boxPosition, boundsMin, boundsMax, dimensions, cloud, cloudTexture, blueNoiseTex);
    const effect = new ShaderPass(shaderMat);
    composer.addPass(effect);
}
