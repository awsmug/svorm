import type Field from '../Field';
import type HasValidationData from '../Interfaces/HasValidationData';
import ValidationMedhods from './ValidationMedhods';

/**
 * Validations class.
 * 
 * @since 1.0.0
 */
export default class Validations {
    private errors: string[] = [];

    /**
     * Constructor.
     * 
     * @param value      A value which have to be validated.
     * @param validation Validation rules array.
     * @param required   Is value required or not.
     * 
     * @since 1.0.0
     */
    constructor(
        private field: Field,
        private validations: HasValidationData[] = []
    ){}

    /**
     * Doing check for given values.
     * 
     * @since 1.0.0
     */
    public validate() : string[] {
        this.errors = [];

        // Running each validation
        this.validations.forEach( validation => {
            let valueAsNumber = ( (validation.value as unknown) as number );

            // Assigning Validation functions
            switch( validation.type ) {
                case 'string':
                    if ( ! ValidationMedhods.string( this.field.value ) ) {
                        this.errors.push( validation.error );
                    }
                    break;
                case 'letters':
                    if ( ! ValidationMedhods.letters( this.field.value ) ) {
                        this.errors.push( validation.error );
                    }
                    break;
                case 'int':
                    if ( ! ValidationMedhods.int( this.field.value ) ) {
                        this.errors.push( validation.error );
                    }
                    break;
                case 'number':
                    if ( ! ValidationMedhods.number( this.field.value ) ) {
                        this.errors.push( validation.error );
                    }
                    break;
                case 'email':
                    if ( ! ValidationMedhods.email( this.field.value ) ) {
                        this.errors.push( validation.error );
                    }
                    break;
                case 'min':
                    if ( ! ValidationMedhods.min( this.field.value, valueAsNumber ) ) {
                        this.errors.push( validation.error );
                    }
                    break;
                case 'max':
                    if ( ! ValidationMedhods.max( this.field.value, valueAsNumber ) ) {
                        this.errors.push( validation.error );
                    }
                    break;
                case 'minLength':
                    if ( ! ValidationMedhods.minLength( this.field.value, valueAsNumber ) ) {
                        this.errors.push( validation.error );
                    }
                    break;
                case 'maxLength':
                    if ( ! ValidationMedhods.maxLength( this.field.value, valueAsNumber ) ) {
                        this.errors.push( validation.error );
                    }
                    break;
                case 'empty':
                    if ( ValidationMedhods.empty( this.field.value ) ) {
                        this.errors.push( validation.error );
                    }
                    break;                    
                case 'inArray':
                    if ( ! ValidationMedhods.inArray( this.field.value, validation.values ) ) {
                        this.errors.push( validation.error );
                    }
                    break;
                case 'isChecked':
                    if ( ! ValidationMedhods.isChecked( this.field.value ) ) {
                        this.errors.push( validation.error );
                    }
                    break;                    
                default:
                    this.errors.push( 'Validations-Typ "' + validation.type + '" existiert nicht."' );
                    break;
            }
        });

        return this.errors;
    }

    /**
     * Are there errors after validation?
     * 
     * @returns True on errors, false if not.
     * 
     * @since 1.0.0
     */
    public hasErrors() : boolean {
        return this.errors.length > 0 ? true : false;
    }

    /**
     * Get errors after validation.
     * 
     * @returns All errors.
     * 
     * @since 1.0.0
     */
    public getErrors() : string[] {
        return this.errors;
    }
}