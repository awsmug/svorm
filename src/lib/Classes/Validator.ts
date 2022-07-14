import type HasValidationData from '../Interfaces/HasValidationData';
import ValidationMedhods from './ValidationMedhods';

/**
 * Validator class.
 * 
 * @since 1.0.0
 */
export default class Validator {
    private errors: string[];

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
        private value: any,
        private validations: HasValidationData[]
    ){}

    /**
     * Doing check for given values.
     * 
     * @since 1.0.0
     */
    public check() : string[] {
        let errors : string[] = [];

        // Running each validation
        this.validations.forEach( validation => {
            let valueAsNumber = ( (validation.value as unknown) as number );

            // Assigning Validation functions
            switch( validation.type ) {
                case 'string':
                    if ( ! ValidationMedhods.string( this.value ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'int':
                    if ( ! ValidationMedhods.int( this.value ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'number':
                    if ( ! ValidationMedhods.number( this.value ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'email':
                    if ( ! ValidationMedhods.email( this.value ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'min':
                    if ( ! ValidationMedhods.min( this.value, valueAsNumber ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'max':
                    if ( ! ValidationMedhods.max( this.value, valueAsNumber ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'minLength':
                    if ( ! ValidationMedhods.minLength( this.value, valueAsNumber ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'maxLength':
                    if ( ! ValidationMedhods.maxLength( this.value, valueAsNumber ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'empty':
                    if ( ValidationMedhods.empty( this.value ) ) {
                        errors.push( validation.error );
                    }
                    break;                    
                case 'inArray':
                    if ( ! ValidationMedhods.inArray( this.value, validation.values ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'isChecked':
                    if ( ! ValidationMedhods.isChecked( this.value ) ) {
                        errors.push( validation.error );
                    }
                    break;                    
                default:
                    errors.push( 'Validations-Typ "' + validation.type + '" existiert nicht."' );
                    break;
            }
        });

        return errors;
    }
}