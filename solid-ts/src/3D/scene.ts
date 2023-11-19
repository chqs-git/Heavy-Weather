import * as BABYLON from "babylonjs";
import { setupShader } from "./setupShader.ts";
import { createEffect, Accessor } from 'solid-js';
import { Cloud } from "../domain/cloud/cloud.ts";
import { CloudGenerator } from "../domain/generators/cloudFill/cloudFill.ts";
import { VoxelMaptoTexture } from "./utils/toTexture.ts";
import { map } from "./utils/vectorUtils.ts";

export function Scene(width: number, height: number, canvas: HTMLCanvasElement, cloud: Accessor<Cloud>) {
    // setup scene
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    // setup background color
    //scene.clearColor = BABYLON.Color3.FromHexString('0x7DA582').toColor4(1.0);
    // setup camera
    const camera = new BABYLON.ArcRotateCamera(
        "camera", Math.PI / 2, Math.PI / 3.2, 1.25, BABYLON.Vector3.Zero(), scene
    );
    camera.attachControl(canvas)
    camera.position.z = 2;

    // setup raymarching container
    const box = { position: new BABYLON.Vector3(0, 0, 0), scaling: new BABYLON.Vector3(1, 1, 1) };
    const boundsMin = map(box.position, box.scaling, (A: number, B: number) =>  A - (B / 2) );
    const boundsMax = map(box.position, box.scaling, (A: number, B: number) =>  A + (B / 2) );

    // raymarching clouds: post-process pass 
    const cloudTex = VoxelMaptoTexture(CloudGenerator(), scene);
    const blueNoiseTex = new BABYLON.Texture('./resources/BlueNoise.png', scene);
    setupShader(camera, new BABYLON.Vector2(width, height), boundsMin, boundsMax, cloud(), cloudTex, blueNoiseTex);
    
    // animate scene
    const divFps = document.getElementById("fps")
    function animate() {
        scene.render();
        if (divFps != null) divFps.innerHTML = engine.getFps().toFixed() + " fps";
    }
    engine.runRenderLoop(animate);

    return scene;
}
