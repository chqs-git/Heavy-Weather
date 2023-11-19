import { Vector3 } from "babylonjs";

export function map (A: Vector3, B: Vector3, fun: (a: number, b: number) => number) {
    return new Vector3(fun(A.x, B.x), fun(A.y, B.y), fun(A.z, B.z));
}