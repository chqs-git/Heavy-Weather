import { ShaderMaterial, Vector2, Vector3, Data3DTexture, Texture } from "three";
import { Cloud } from "../../domain/cloud/cloud";

import vertexShader from './cloud_vertex.glsl';
import fragmentShader from "./cloud_fragment.glsl";
import simple_fragment from "./simple_fragment.glsl";

export function cloudRaymarcher(
    cameraPosition: Vector3,
    boxPosition: Vector3,
    boundsMin: number,
    boundsMax: number,
    dimensions: Vector2,
    cloud: Cloud,
    cloudTex: Data3DTexture,
    blueNoiseTex: Texture,
    ): ShaderMaterial {
    
    return new ShaderMaterial({
        uniforms: {
            camPos: { value: cameraPosition},
            boxPos: { value: boxPosition },
            boundsMin: { value: boundsMin },
            boundsMax: { value: boundsMax },
            dimensions: { value: dimensions },
            numSteps: { value: cloud.billow.resolution },
            overlayStrength: { value: cloud.lighting.darknessOverlay },
            cloudScale: { value: cloud.lighting.scale },
            densityMultiplier: { value: cloud.lighting.densityMultiplier },
            lightCol: { value: cloud.lighting.lightColor },
            lightDir: { value: cloud.lighting.lightDir },
            shadowCol: { value: cloud.lighting.shadowColor },
            lightAbsorptionThroughCloud: { value: cloud.lighting.lightAbsorptionThroughCloud },
            darknessThreshold: { value: cloud.lighting.darknessThreshold },
            powderStrength: { value: cloud.lighting.powderStrength },
            time: { value: 1.0 },
            cloudTex: { value: cloudTex },
            blueTex: { value: blueNoiseTex }
        },
        vertexShader: vertexShader,
        fragmentShader: simple_fragment
    });
}
