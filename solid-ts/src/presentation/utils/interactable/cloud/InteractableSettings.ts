import { Cloud } from "../../../../domain/cloud/cloud";

export interface InteractableSettings {
    onUpdate(cloud: Cloud, callback: (cloud: Cloud) => void): void
    toCloud(cloud: Cloud): Cloud
}