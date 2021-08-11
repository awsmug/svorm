import ValidationMedhods from './ValidationMedhods';

/**
 * Validator class.
 * 
 * @since 1.0.0
 */
export default class Validation {
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
        private validations: []
    ){}

    /**
     * Doing check for given values.
     * 
     * @since 1.0.0
     */
    public check() : [] {
        let errors = [];

        // Running each validation
        this.validations.forEach( validation => {
            // Assigning Validation functions
            switch( validation.type ) {
                case 'string':
                    if ( ! ValidationMedhods.string( this.value ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'min':
                    if ( ! ValidationMedhods.min( this.value, validation.value ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'max':
                    if ( ! ValidationMedhods.max( this.value, validation.value ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'minLength':
                    if ( ! ValidationMedhods.minLength( this.value, validation.value ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'maxLength':
                    if ( ! ValidationMedhods.maxLength( this.value, validation.value ) ) {
                        errors.push( validation.error );
                    }
                    break;
                case 'inArray':
                    if ( ! ValidationMedhods.inArray( this.value, validation.values ) ) {
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