import type HasConditionData from "./HasConditionData";

/**
 * Condition data interface.
 * 
 * @since 1.0.0
 */
 export default interface HasActionData {
    readonly name: string;
    readonly on: string;
    readonly conditions: HasConditionData[];
}