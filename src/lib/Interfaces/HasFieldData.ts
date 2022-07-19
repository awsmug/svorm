import type Field from "$lib/Classes/Field";
import type HasChoicesData from "./HasChoicesData";
import type HasConditionData from "./HasConditionData";
import type HasHelpData from "./HasHelpData";
import type HasReplacementData from "./HasReplacementData";
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
    readonly prefix      : string;
    readonly suffix      : string;
    readonly placeholder : string;
    readonly classes     : string[];
    readonly fields      : Field[];
    readonly params      : any[];
    readonly choices     : HasChoicesData[];
    readonly defaultValue: any;
    readonly dynamicValue: any;
    readonly conditions  : HasConditionData[];
    readonly validations : HasValidationData[];
    readonly replacements: HasReplacementData[];
    readonly required    : boolean;
    readonly help        : HasHelpData;
    readonly value       : any;
}