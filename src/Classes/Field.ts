import type HasFieldData from '../Interfaces/HasFieldData';
import type HasConditionData from "../Interfaces/HasConditionData";
import type HasHelpData from '../Interfaces/HasHelpData';
import type Fieldset from './Fieldset';
import Help from './Help';
import Validator from './Validator';
import type HasChoicesData from '../Interfaces/HasChoicesData';
import type HasValidationData from '../Interfaces/HasValidationData';

/**
 * Field class.
 * 
 * @since 1.0.0
 */
export default class Field implements HasFieldData {
    readonly fieldset    : Fieldset;
    readonly name        : string;
    readonly type        : string;    
    readonly label       : string;
    readonly placeholder : string;
    readonly required    : boolean;
    readonly default     : any[];
    readonly params      : any[];
    readonly help        : HasHelpData;
    readonly choices     : HasChoicesData[];
    readonly conditions  : HasConditionData[];
    readonly validations : HasValidationData[];

    public   value       : any;
    private  classes     : string[];
    private  validated   : boolean = false;    
    private  errors      : string[] = [];

    /**
     * Initializing field.
     * 
     * @param name  Name of the field.
     * @param field Field object
     * 
     * @since 1.0.0
     */
    public constructor(
        fieldset : Fieldset,
        field    : Field
    ){
        this.fieldset     = fieldset;
        this.name         = field.name;
        this.type         = field.type;
        this.label        = field.label;
        this.placeholder  = field.placeholder;
        this.help         = field.help === undefined ? undefined : new Help( field.help );
        this.choices      = field.choices === undefined ? []: field.choices;
        this.params       = field.params === undefined ? []: field.params;
        this.classes      = field.classes === undefined ? []: field.classes;
        this.required     = field.required === undefined ? false: true;        
        this.validations  = field.validations === undefined ? []: field.validations;
        this.conditions   = field.conditions === undefined ? []: field.conditions;  

        this.value        = field.value;
    }

    /**
     * Set value of field.
     * 
     * @param value Value to set.
     * 
     * @since 1.0.0
     */
    public setValue( value: any ) {
        this.value = value;
    }

    /**
     * Get value of field.
     * 
     * @param value Value to set.
     * 
     * @since 1.0.0
     */
    public getValue() : any {
        return this.value;
    }

    /**
     * Does field have choices.
     * 
     * @return True if it has choices, false if not.
     * 
     * @since 1.0.0
     */
    public hasChoices() {
        return this.choices.length > 0;
    }

    /**
     * Add a CSS class to field.
     * 
     * @param className CSS class name.
     * 
     * @since 1.0.0
     */
    public addClass( className: string ) : void {
        this.removeClass( className ); // Remove maybe existing class
        this.classes.push( className );
    }

    /**
     * Add a CSS class to field.
     * 
     * @param className CSS class name.
     * 
     * @since 1.0.0
     */
    public removeClass( className: string ) : void {
        this.classes = this.classes.filter( function( value ){ 
            return value !== className;
        });
    }

    /**
     * Get CSS Classes.
     * 
     * @return String of CSS classes.
     * 
     * @since 1.0.0
     */
    public getClasses( additionalClasses: string[] = []): string {
        let genericClases = [ 'input', 'input-' + this.type ];
        this.classes = genericClases.concat( this.classes );

        if ( this.classes.length > 0  ) {
            return additionalClasses.concat( this.classes ).join(' ') ;
        }
        
        return additionalClasses.join(' ');
    }

    /**
     * Validate the field.
     * 
     * @return Array of errors, empty array on no errors.
     * 
     * @since 1.0.0
     */
    public validate() : string[] {
        let validation = new Validator( this.value, this.validations );
        this.errors = validation.check();
        
        if ( this.errors.length > 0 ) {
            this.addClass( 'error' );
            this.removeClass( 'validated' )
        } else {
            this.removeClass( 'error' );
            this.addClass( 'validated' );
        }

        this.wasValidated = true;

        return this.errors;
    }

    /**
     * Get validation errors.
     * 
     * @return Erros which occured while validating.
     * 
     * @since 1.0.0
     */
    public getValidationErors() : string[] {
        return this.errors;
    }

    /**
     * Has field validation errors.
     * 
     * @return True if field has errors, false if not.
     * 
     * @since 1.0.0
     */
    public hasValidationErrors() : boolean {
        if ( this.errors.length > 0 ) {            
            return true;
        }

        return false;
    }

    /**
     * Has the field already ben validated
     * 
     * @return True if field has been validated, false if not.
     * 
     * @since 1.0.0
     */
    public hasBeenValidated() : boolean {
        return this.validated;
    }

    /**
     * Conditions fullfilled.
     * 
     * @return True if fullfilled, false if not.
     * 
     * @since 1.0.0
     */
    public conditionsFullfilled() : boolean
    {
        if ( this.conditions.length === 0 ) {
            return true;
        }

        let fullfillments = [];

        this.conditions.forEach( ( condition: HasConditionData ) => {
            let fullfilled = false;
            let field = this.fieldset.form.getField( condition.field );

            switch ( condition.operator ) {
                case '==':
                    fullfilled = condition.value === field.getValue();
                    break;
                case '!=':
                    fullfilled = condition.value !== field.getValue();
                    break;
                case '>':
                    fullfilled = condition.value !== field.getValue();
                    break;                    
                case '<':
                    fullfilled = condition.value !== field.getValue();
                    break;
                default:
                    throw new Error( 'Operator "' + condition.operator + '" does not exist.');                        
            }

            fullfillments.push( fullfilled );
        });

        return ! fullfillments.includes( false );
    }
}