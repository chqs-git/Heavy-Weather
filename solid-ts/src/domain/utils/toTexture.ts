import { Data3DTexture } from "three";
import { VoxelMap } from "./voxels/VoxelMap.ts";


export function VoxelMaptoTexture(map : VoxelMap<number>): Data3DTexture {
      const data = new Uint8Array(map.lengthTotal * 3);

      for (let i = 0; i < map.lengthTotal; i++) {
          const k = i * 3;
          const valToRgb = map.getFromIndex(i) * 355;
          data[k] = valToRgb;
          data[k + 1] = valToRgb;
          data[k + 2] = valToRgb;
      }

      return new Data3DTexture(data, map.length, map.length, map.length);
}

