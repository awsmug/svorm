import type HasCallbackData from "../Interfaces/HasCallbackData";
import type Form from "../Form";

/**
 * Dynamic value class.
 * 
 * @since 1.0.0
 */
export default class DynamicValue {
    /**
     * Initializing field.
     * 
     * @param form Form object.
     * @param type Type of dynamic value.
     * 
     * @since 1.0.0
     */
    public constructor(
        private form: Form,
        private value: any,
        private valueField: string,
        private valueDefault: any,
        private valueCallback: HasCallbackData
    ) { }

    /**
     * Get value
     * 
     * @param form Form object.
     * @param type Type of dynamic value.
     * 
     * @since 1.0.0
     */
    public get(): any {
        // 1st take value if is already set
        if (this.value !== undefined && this.value !== '') {
            return this.value;
        }

        // 2nd take default value
        if (this.valueDefault !== undefined) {
            return this.valueDefault;
        }

        // 3nd take value form field
        if (this.valueField !== undefined) {
            let field = this.form.getField(this.valueField);
            if (field !== undefined) {
                return field.value;
            }
        }

        // 3rd take callback
        if (this.valueCallback !== undefined) {
            let func;
            const words = this.valueCallback.method.split('.');

            if (words.length === 1) {
                func = window[words[0]];
            }
            else if (words.length === 2) {
                let obj = window[words[0]];
                func = obj[words[1]];
            }


            let params = this.valueCallback.params !== undefined ? this.valueCallback.params : [];

            if (this.valueCallback.addFormParam === true) {
                if (params === undefined) {
                    params = [this.form];
                } else {
                    params.push(this.form);
                }
            }

            return func.apply(window, params);
        }
    }
}

