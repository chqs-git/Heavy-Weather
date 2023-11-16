import { Vector3, Color } from "three"


export class Lighting {
    scale: number
    densityMultiplier: number
    detailDensityThreshold: number
    detailDensityMultiplier : number

    lightDir: Vector3
    lightColor: Color
    shadowColor: Color
    lightAbsorptionThroughCloud: number
    darknessThreshold: number
    darknessOverlay: number
    powderStrength: number
    backgroundColor: Color

    constructor(
        scale: number,
        densityMultiplier: number,
        detailDensityThreshold: number,
        detailDensityMultiplier : number,
        lightDir: Vector3,
        lightColor: Color,
        shadowColor: Color,
        lightAbsorptionThroughCloud: number,
        darknessThreshold: number,
        darknessOverlay: number,
        powderStrength: number,
        backgroundColor: Color
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
                new Color(1, 1, 1),
                new Color(20 / 225, 20 / 225, 20 / 225),
                .85,
                5,
                .85,
                .1,
                new Color(51, 51, 76)
            )
        }
}