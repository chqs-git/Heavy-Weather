import { Vector3, Color3 } from "babylonjs"


export class Lighting {
    scale: number
    densityMultiplier: number
    detailDensityThreshold: number
    detailDensityMultiplier : number

    lightDir: Vector3
    lightColor: Color3
    shadowColor: Color3
    lightAbsorptionThroughCloud: number
    darknessThreshold: number
    darknessOverlay: number
    powderStrength: number
    backgroundColor: Color3

    constructor(
        scale: number,
        densityMultiplier: number,
        detailDensityThreshold: number,
        detailDensityMultiplier : number,
        lightDir: Vector3,
        lightColor: Color3,
        shadowColor: Color3,
        lightAbsorptionThroughCloud: number,
        darknessThreshold: number,
        darknessOverlay: number,
        powderStrength: number,
        backgroundColor: Color3
        ) {
            this.lightDir = lightDir
            this.scale = scale
            this.densityMultiplier = densityMultiplier
            this.detailDensityThreshold = detailDensityThreshold
            this.detailDensityMultiplier = detailDensityMultiplier
            this.lightColor = lightColor
            this.shadowColor = shadowColor
            this.lightAbsorptionThroughCloud = lightAbsorptionThroughCloud
            this.darknessThreshold = darknessThreshold
            this.darknessOverlay = darknessOverlay
            this.powderStrength = powderStrength
            this.backgroundColor = backgroundColor
        }

        static default(): Lighting {
            return new Lighting(
                1,
                15,
                0,
                1,
                new Vector3(.5, -1, 0),
                new Color3(0.9, 0.9, 0.9),
                new Color3(20 / 255, 20 / 255, 20 / 255),
                .85,
                5,
                .85,
                .1,
                new Color3(51 / 255, 51 / 255, 76 / 255)
            )
        }
}