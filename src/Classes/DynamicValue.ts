import type HasCallbackData from "../Interfaces/HasCallbackData";
import type Form from "./Form";

/**
 * Dynamic value class.
 * 
 * @since 1.0.0
 */
export default class DynamicValue {
    readonly form: Form;
    readonly value: string;
    readonly field: string;
    readonly callback: HasCallbackData;

    /**
     * Initializing field.
     * 
     * @param form Form object.
     * @param type Type of dynamic value.
     * 
     * @since 1.0.0
     */
    public constructor(
        form : Form,
        values: any
    ){
        this.form = form;
        this.value = values.value;
        this.field = values.field;
        this.callback = values.callback;
    }

    /**
     * Get value
     * 
     * @param form Form object.
     * @param type Type of dynamic value.
     * 
     * @since 1.0.0
     */
    public getValue() : any
    {
        // 1st take value
        if ( this.value !== undefined && this.value !== '' )
        {
            return this.value;
        }

        // 2nd take field
        if( this.field !== undefined )
        {
            let field = this.form.getField( this.field );
            if( field !== undefined )
            {
                return field.getValue();
            }   
        }

        // 3rd take callback
        if( this.callback !== undefined )
        {
            let func;
            const words = this.callback.method.split('.');

            if( words.length === 1 )
            {
                func = window[ words[0] ];
            } 
            else if( words.length === 2 )
            {
                let obj = window[ words[0] ];
                func = obj[ words[1] ];
            }

            if( this.callback.params === undefined ) 
            {
                return func();
            } 
            else 
            {
                return func.apply( window, this.callback.params );
            }
        }
    }
}

