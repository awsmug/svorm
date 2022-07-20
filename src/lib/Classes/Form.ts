import type HasFormData from './Interfaces/HasFormData';
import type Field from './Field';
import type Trigger from './Helpers/Trigger';
import Fieldset from './Fieldset';
import Navigation from './Navigation';
import CSSElement from './Abstract/CSSElement';

/**
 * Class Form.
 * 
 * @since 1.0.0
 */
export default class Form extends CSSElement {
    readonly name       : string;
    readonly navigation : Navigation;
    readonly fieldsets  : Fieldset[];
    readonly triggers   : Trigger[];

    /**
     * Initializing form data.
     * 
     * @param formData Formdata from JSON file.
     * 
     * @since 1.0.0
     */
    public constructor( formData: HasFormData ) {
        super();

        this.name      = formData.name;
        this.fieldsets = [];
        
        this.addClass('needs-validation'); // BS5 class

        formData.classes?.forEach( className => this.addClass(className) );
        formData.fieldsets.forEach( fieldset => this.fieldsets.push( new Fieldset( this, fieldset ) ) );

        this.navigation = new Navigation( this, formData.start );
    }

    /**
     * Get a specific fieldset.
     * 
     * @param name Name of fieldset
     * @return Fieldset
     * 
     * @since 1.0.0
     */
    public getFieldset( name: string ) : Fieldset {
        let foundFieldset: Fieldset;

        this.fieldsets.forEach( ( fieldset: Fieldset ) => {
            if( fieldset.name === name ) {
                foundFieldset = fieldset;
            }
        });

        return foundFieldset;
    }

    /**
     * Get a specific field.
     * 
     * @param name Name of field.
     * @return Field object. Undefined if nothing was found.
     * 
     * @since 1.0.0
     */
    public getField( name: string ) : Field {
        let foundField: Field;

        this.fieldsets.forEach( ( fieldset: Fieldset ) => {
            let field = fieldset.getField(name);
            if( field !== undefined ) {
                foundField = field;
            }
        });

        return foundField;
    }

    /**
     * Has form validation errors.
     * 
     * @return True if field has errors, false if not.
     * 
     * @since 1.0.0
     */
    public hasValidationErrors() : boolean {
        this.fieldsets.forEach( ( fieldset: Fieldset ) => {
            if( fieldset.hasValidationErrors() ) {
                return true;
            }
        });

        return false;
    }
}