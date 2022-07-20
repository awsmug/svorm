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
    readonly fields: Field[];
    readonly type: string;
    readonly name: string;
    readonly label: string;
    readonly prefix: string;
    readonly suffix: string;
    readonly placeholder: string;
    readonly classes: string[];
    readonly choices: HasChoicesData[];
    readonly conditions: HasConditionData[];
    readonly validations: HasValidationData[];
    readonly replacements: HasReplacementData[];
    readonly help: HasHelpData;
    readonly params: any;
    readonly paramsCallback: any;
    readonly value: any;
    readonly valueDefault: any;
    readonly valueCallback: any;
}