import * as BABYLON from "babylonjs";
import { Cloud } from "../domain/cloud/cloud";
import fragmentShader from "../shaders/cloud/cloud_fragment.glsl";

export function setupShader(
    camera: BABYLON.ArcRotateCamera,
    dimensions: BABYLON.Vector2,
    boundsMin: BABYLON.Vector3,
    boundsMax: BABYLON.Vector3,
    cloud: Cloud,
    cloudTexture: BABYLON.RawTexture3D,
    blueNoiseTex: BABYLON.Texture
    ) {
    // prepare postProcess pass
    const postProcess = setupPostProcess(camera);
    // declare variables
    let time = 0;
    // apply postprocess
    postProcess.onApply = function(shader) {
        time += 0.1;
        shader.setFloat("time", time);
        
        //Defaults
        shader.setVector2("Dimensions", dimensions)
        shader.setVector3("CamPos", camera.position);
        shader.setVector3("BoundsMin", boundsMin);
        shader.setVector3("BoundsMax", boundsMax);

        //Textures 
        shader.setTexture("CloudTex", cloudTexture);
        shader.setTexture("BlueTex", blueNoiseTex);

        //Cloud
        shader.setFloat("numSteps", cloud.billow.resolution);
        shader.setFloat("overlayStrength", cloud.lighting.darknessOverlay);
        shader.setFloat("CloudScale", cloud.lighting.scale);
        shader.setFloat("DensityMultiplier", cloud.lighting.densityMultiplier);

        //Light
        shader.setColor3("lightCol", cloud.lighting.lightColor);
        shader.setVector3("lightDir",  cloud.lighting.lightDir);
        shader.setColor3("shadowCol", cloud.lighting.shadowColor);
        shader.setFloat("lightAbsorptionThroughCloud", cloud.lighting.lightAbsorptionThroughCloud);
        shader.setFloat("darknessThreshold", cloud.lighting.darknessThreshold);
        shader.setFloat("powderStrength", cloud.lighting.powderStrength);
    }
}

function setupPostProcess(camera: BABYLON.ArcRotateCamera): BABYLON.PostProcess {
    BABYLON.Effect.ShadersStore["raymarchFragmentShader"] = fragmentShader;
    return new BABYLON.PostProcess("raymarching post process", "raymarch",
        [
            "CamPos", "BoundsMin", "BoundsMax", "Dimensions",
            "numSteps", "overlayStrength", "CloudScale",
            "DensityMultiplier", "lightCol", "lightDir",
            "shadowCol", "lightAbsorptionThroughCloud",
            "darknessThreshold", "time", "powderStrength"
        ],
        ["CloudTex", "BlueTex"], 1, camera);
} 