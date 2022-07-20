import type Field from "../Field";
import type HasReplacementData from "../Interfaces/HasReplacementData";

/**
 * Conditions class.
 * 
 * @since 1.0.0
 */
 export default class Replacements {
    /**
     * Constuctor.
     * 
     * @param form Form object.
     * @param conditions Conditions.
     * 
     * @since 1.0.0
     */
     public constructor(
        readonly field: Field,
        readonly replacements: HasReplacementData[] = []
    ){}

    /**
     * Replace in field.
     * 
     * @since 1.0.0
     */
    public replace() {
        if (this.replacements.length === 0) {
            return;
        }

        if (this.field.value == null) {
            return;
        }

        this.replacements.forEach(replacement => {
            this.field.value = this.field.value.replace(replacement.from, replacement.to);
        });
    }
 }