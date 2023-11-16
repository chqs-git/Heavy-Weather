import {MapHash} from "../../utils/voxels/MapHash";
import {MapArray} from "../../utils/voxels/MapArray";

/**
 * Overlay the second map on the first one.
 * Cpu implementation of previous gpu function to speed up render.
 * @return the result of the overlay of both maps.
 */
/* @Fixme(overlay maps is incomplete)
export function overlayMaps (mapA: MapHash<number>, mapB: MapArray<number>): MapHash<number> {
    return mapA.mapTo((value, _) => overlayFn(value * 10, z) / 200)
}*/

/**
 * Overlay math function.
 * Inspired by the blender math function.
 */
function overlayFn (a: number, b: number): number {
    if (b > 0.5) {
        return 2 * a * b
    } else {
        return 1 - (2 * (1 - a) * (1 - b))
    }
}
