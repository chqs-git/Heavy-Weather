import {createWorleyNoise, increaseMapSize} from "./defaultWorleyNoise";
import {MapArray} from "../../utils/voxels/MapArray";

export function worleyGenerator (
    resolution: number, numCellsAxis: number, seed : string = "default",
    octaves: number, persistence: number) : MapArray<number>
{
    resolution = resolution - (resolution % numCellsAxis);
    const res = resolution / 4

    let max = 0
    let frequency = 2;
    let amplitude = persistence;

    // combine values
    let map = createWorleyNoise(res, numCellsAxis * frequency, seed);
    for(let i = 1; i <= octaves; i++) {
        const chunk = createWorleyNoise(res, numCellsAxis * frequency, seed);

        map.map((value, index) => value + chunk.getFromIndex(index) * amplitude);

        frequency *= 2;
        max += amplitude
        amplitude *= persistence;
    }

    // remap values
    if (max != 1) map.map((value, _) => value / max)

    return increaseMapSize(map, resolution)
}
