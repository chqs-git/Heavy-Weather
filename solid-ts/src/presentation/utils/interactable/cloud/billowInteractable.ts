import { Billow } from "../../../../domain/cloud/billow"
import { Interactable, SliderInteractable, TextInteractable, NumberInteractable } from "../interactable";



export class BillowInteractable {
  "resolution": Interactable<number>
  "worleySeed": Interactable<string>
  "numCells": Interactable<number>
  "octaves": Interactable<number>
  "persistence": Interactable<number>
  "expanseSeed": Interactable<string>
  "decay": Interactable<number>
  "numberOfIslands": Interactable<number>

  constructor(billow: Billow) {
    this.resolution = new SliderInteractable(billow.resolution, 25, 144, 1);
    this.worleySeed = new TextInteractable(billow.worleySeed);
    this.numCells = new SliderInteractable(billow.numCells, 4, 16, 1);
    this.octaves = new SliderInteractable(billow.octaves, 1, 4, 1);
    this.persistence = new SliderInteractable(billow.persistence, 0, 1);
    this.expanseSeed = new TextInteractable(billow.expanseSeed);
    this.decay = new SliderInteractable(billow.resolution, 25, 144);
    this.numberOfIslands = new NumberInteractable(billow.numberOfIslands);
  }
}
