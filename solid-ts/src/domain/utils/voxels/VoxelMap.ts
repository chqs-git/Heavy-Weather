import { Vector3 } from "three";

/**
 The **Voxel Map** interface defines the interface for a tridimensional 
 map made out of voxels. A voxel is a pixel inside
 a tridimensional grid. 
 
 In this interface the *pixel* represent's the generic type [T].
*/
export interface VoxelMap<T> {
    length : number;
    lengthSlice : number;
    lengthTotal : number;

    get (x: number, y: number, z: number): T

    getFromPos (coord: Vector3): T

    getFromIndex (index: number): T

    add (x: number, y: number, z: number, value: T): void

    addFromPos (coord: Vector3, value: T): void

    addFromIndex (index: number, value: T): void

    map (fn: (index: number, value: T) => T): void

    mapTo (fn: (index: number, value: T) => T): VoxelMap<T>
}
