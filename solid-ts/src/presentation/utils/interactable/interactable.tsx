import { JSX } from "solid-js/jsx-runtime";
import { Vector3 } from "babylonjs"

export interface Interactable<T> {
  value: T
  createElement(onUpdate: () => void): JSX.Element
}

export class TextInteractable implements Interactable<string> {
  value: string;
  
  constructor(value: string) {
    this.value = value;
  }

  createElement(onUpdate: () => void): JSX.Element {
   const onChangeVal = (x: string) => {this.value = x; onUpdate()};
  
    return (
      <div class="interactable">
          <input 
              type="text" 
              onChange={(e) => onChangeVal(e.target.value)} 
              value={this.value} 
              class="text" 
              id="interactable_text" 
              name="interactable_text"
         />
      </div>
      )
  }
}

export class NumberInteractable implements Interactable<number> {
  value: number;
  
  constructor(value: number) {
    this.value = value;
  }

  createElement(onUpdate: () => void): JSX.Element {
   const onChangeVal = (x: number) => {this.value = x; onUpdate()};
  
    return (
      <div class="interactable">
          <input 
              type="number" 
              onChange={(e) => onChangeVal(parseFloat(e.target.value))} 
              value={this.value} 
              class="text" 
              id="interactable_text" 
              name="interactable_text"
         />
      </div>
      )
  }
}

export class ColorInteractable implements Interactable<string> {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  createElement(onUpdate: () => void): JSX.Element {
    const onChangeVal = (x: string) => {this.value = x; onUpdate()}; 
  
    return (
      <div class="interactable">
          <input 
              type="color" 
              onChange={(e) => onChangeVal(e.target.value)}  
              class="color" 
              id="interactable_color" 
              name="interactable_color" 
              value={this.value} 
          />
      </div>
      )
  }
}

export class SliderInteractable implements Interactable<number> {
  value: number
  step: number
  min: number
  max: number

  constructor(value: number, min: number, max: number, step: number = 0.01) {
    this.value = value;
    this.min = min;
    this.max = max;
    this.step = step;
  }

  createElement(onUpdate: () => void): JSX.Element {
  const onChangeVal = (x: number) => {this.value = x; onUpdate()}; 
  
    return (
      <div class="interactable">
          <input 
              type="range" 
              onChange={(e) => onChangeVal(parseFloat(e.target.value))} 
              step={this.step} 
              min={this.min} 
              max={this.max} 
              value={this.value} 
              class="slider" 
              id="interactable_range"/>
      </div>
    )
  }
}

export class Vector3Interactable implements Interactable<Vector3> {
  value: Vector3;

  constructor(value: Vector3) {
    this.value = value;
  }

  setX(vector: Vector3, x: number): Vector3 { return new Vector3(x, vector.y, vector.z);}
  setY(vector: Vector3, y: number): Vector3 { return new Vector3(vector.x, y, vector.z);}
  setZ(vector: Vector3, z: number): Vector3 { return new Vector3(vector.x, vector.y, z);}

  createElement(onUpdate: () => void): JSX.Element {
    const onChangeX = (x: number) =>  {this.value = this.setX(this.value, x); onUpdate();}
    const onChangeY = (y: number) =>  {this.value = this.setY(this.value, y); onUpdate();}
    const onChangeZ = (z: number) =>  {this.value = this.setZ(this.value, z); onUpdate();}
  
    return (
        <div class="interactable">
          <div class="vector3">
            <input
              type="text"
              onChange={(e) => onChangeX(parseFloat(e.target.value))}
              value={this.value.x}
              class="text"
              id="interactable_text_x"
              name="interactable_text_x"
            />
            <input
              type="text"
              onChange={(e) => onChangeY(parseFloat(e.target.value))}
              value={this.value.y}
              class="text"
              id="interactable_text_y"
              name="interactable_text_y"
            />
            <input
              type="text"
              onChange={(e) => onChangeZ(parseFloat(e.target.value))}
              value={this.value.z}
              class="text"
              id="interactable_text_z"
              name="interactable_text_z"
            />
          </div>
        </div>
      )
  }
}
