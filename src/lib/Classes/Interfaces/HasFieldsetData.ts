import type Field from "../Field";
import type HasSubmissionData from "./HasSubmissionData";
import type HasConditionData from "./HasConditionData";

/**
 * Fieldset data interface.
 * 
 * @since 1.0.0
 */
export default interface HasFieldsetData {
    readonly name          : string;
    readonly label         : string;    
    readonly params        : [];
    readonly classes       : [];
    readonly fields        : Field[];
    readonly conditions    : HasConditionData[];
    
    readonly percentage    : number;
    readonly nextFieldset  : string;
    readonly prevFieldset  : string;

    readonly submission    : HasSubmissionData;
}