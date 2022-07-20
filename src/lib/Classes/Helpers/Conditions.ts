import type HasConditionData from "$lib/Classes/Interfaces/HasConditionData";
import type Form from "../Form";

/**
 * Conditions class.
 * 
 * @since 1.0.0
 */
 export default class Conditions {
    /**
     * Constuctor.
     * 
     * @param form Form object.
     * @param conditions Conditions.
     * 
     * @since 1.0.0
     */
    public constructor(
        readonly form: Form,
        readonly conditions: HasConditionData[] = []
    ){}

    /**
     * Checks if conditions are fullfilled.
     * 
     * @returns True if fullfilled, false if not.
     * 
     * @since 1.0.0
     */
    public fullfilled(): boolean {
        let fullfillments = [];

        this.conditions.forEach((condition: HasConditionData) => {
            let fullfilled = false;
            let field = this.form.getField(condition.field);

            switch (condition.operator) {
                case '==':
                    fullfilled = condition.value === field.value;
                    break;
                case '!=':
                    fullfilled = condition.value !== field.value;
                    break;
                case '>':
                    fullfilled = condition.value !== field.value;
                    break;
                case '<':
                    fullfilled = condition.value !== field.value;
                    break;
                default:
                    throw new Error('Operator "' + condition.operator + '" does not exist.');
            }

            fullfillments.push(fullfilled);
        });

        return !fullfillments.includes(false);
    }
 }