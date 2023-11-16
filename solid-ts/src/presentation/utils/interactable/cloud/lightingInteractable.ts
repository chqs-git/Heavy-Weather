import { Lighting } from "../../../../domain/cloud/lighting"
import { Vector3 } from "three"
import { Interactable, SliderInteractable, Vector3Interactable, ColorInteractable } from "../interactable";

export class LightingInteractable {
    scale: Interactable<number>
    densityMultiplier: Interactable<number>
    detailDensityThreshold: Interactable<number>
    detailDensityMultiplier: Interactable<number>

    lightDir: Interactable<Vector3>
    lightColor: Interactable<string>
    shadowColor: Interactable<string>
    lightAbsorptionThroughCloud: Interactable<number>
    darknessThreshold: Interactable<number>
    darknessOverlay: Interactable<number>
    powderStrength: Interactable<number>
    backgroundColor: Interactable<string>

    constructor(lighting: Lighting) {
        this.scale = new SliderInteractable(lighting.scale, 0, 1);
        this.densityMultiplier = new SliderInteractable(lighting.densityMultiplier, 0, 1);
        this.detailDensityThreshold = new SliderInteractable(lighting.detailDensityThreshold, 0, 1);
        this.detailDensityMultiplier = new SliderInteractable(lighting.detailDensityMultiplier, 0, 1);
        this.lightDir = new Vector3Interactable(lighting.lightDir);
        this.lightColor = new ColorInteractable(lighting.lightColor.getHexString());
        this.shadowColor = new ColorInteractable(lighting.shadowColor.getHexString());
        this.lightAbsorptionThroughCloud = new SliderInteractable(lighting.lightAbsorptionThroughCloud, 0, 1);
        this.darknessThreshold = new SliderInteractable(lighting.darknessThreshold, 0, 1);
        this.darknessOverlay = new SliderInteractable(lighting.darknessOverlay, 0, 1);
        this.powderStrength = new SliderInteractable(lighting.powderStrength, 0, 1);
        this.backgroundColor = new ColorInteractable(lighting.backgroundColor.getHexString());
    }
}
