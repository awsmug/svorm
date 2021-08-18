import type HasChoicesData from "./HasChoicesData";
import type HasConditionData from "./HasConditionData";
import type HasValidationData from "./HasValidationData";

/**
 * Field data interface.
 * 
 * @since 1.0.0
 */
export default interface HasFieldData {
    readonly type        : string;
    readonly name        : string;    
    readonly label       : string;
    readonly params      : any[];
    readonly choices     : HasChoicesData[];
    readonly default     : any;

    readonly conditions  : HasConditionData[];
    readonly validations : HasValidationData[];
    readonly required    : boolean;
}