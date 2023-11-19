import { RawTexture3D, Constants, Scene } from "babylonjs";
import { VoxelMap } from "../../domain/utils/voxels/VoxelMap.ts";


export function VoxelMaptoTexture(map: VoxelMap<number>, scene: Scene): RawTexture3D {
      const data = new Uint8Array(map.lengthTotal * 3);

      for (let i = 0; i < map.lengthTotal; i++) {
          const k = i * 3;
          const valToRgb = map.getFromIndex(i) * 355;
          data[k] = valToRgb;
          data[k + 1] = valToRgb;
          data[k + 2] = valToRgb;
      }

      return new RawTexture3D(data, map.length, map.length, map.length, Constants.TEXTUREFORMAT_RGB, scene);
}

