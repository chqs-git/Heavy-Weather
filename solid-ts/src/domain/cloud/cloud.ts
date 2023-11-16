import { Billow } from "./billow"
import { Lighting } from "./lighting"

export class Cloud {
    billow: Billow
    lighting: Lighting

    constructor(cloud: Billow, rendering: Lighting) {
        this.billow = cloud
        this.lighting = rendering
    }

    static default(): Cloud {
        return new Cloud(
            Billow.default(),
            Lighting.default()
        )
    }
}
