import type HasPartData from "../Interfaces/HasPartData";

export default class Part implements HasPartData {
    readonly width:            number;
    readonly length:           number;
    readonly height:           number;
    readonly horizontalOffset: number;
    readonly verticalOffset:   number;
}