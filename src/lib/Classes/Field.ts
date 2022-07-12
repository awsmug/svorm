import type HasFieldData from '../Interfaces/HasFieldData';
import type HasConditionData from "../Interfaces/HasConditionData";
import type HasHelpData from '../Interfaces/HasHelpData';
import type Fieldset from './Fieldset';
import Help from './Help';
import Validator from './Validator';
import type HasChoicesData from '../Interfaces/HasChoicesData';
import type HasValidationData from '../Interfaces/HasValidationData';
import DynamicValue from './DynamicValue';
import CSSElement from './CSSElement';

var startedMulticol = false;

/**
 * Field class.
 * 
 * @since 1.0.0
 */
export default class Field extends CSSElement implements HasFieldData {
    readonly fieldset    : Fieldset;
    readonly fields      : Field[] = [];
    readonly name        : string;
    readonly type        : string;    
    readonly label       : string;
    readonly placeholder : string;
    readonly multicol    : number;
    readonly required    : boolean;
    readonly defaultValue: any[];
    readonly dynamicValue: any[];
    readonly params      : any[];
    readonly help        : HasHelpData;
    readonly choices     : HasChoicesData[];
    readonly conditions  : HasConditionData[];
    readonly validations : HasValidationData[];
    readonly gridsize    : number;

    public  value        : any;
    private validated    : boolean = false;    
    private errors       : string[] = [];
    private inputClasses : string[] = [];

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
        super();

        this.fieldset     = fieldset;
        this.name         = field.name;
        this.type         = field.type;
        this.label        = field.label;
        this.placeholder  = field.placeholder;
        this.multicol     = field.multicol === undefined ? 0 : field.multicol;
        this.help         = field.help === undefined ? undefined : new Help( field.help );
        this.choices      = field.choices === undefined ? []: field.choices;
        this.params       = field.params === undefined ? []: field.params;
        this.required     = field.required === undefined ? false: true; 
        this.defaultValue = field.defaultValue === undefined ? undefined: field.defaultValue;
        this.dynamicValue = field.dynamicValue === undefined ? undefined: field.dynamicValue;
        this.validations  = field.validations === undefined ? []: field.validations;
        this.conditions   = field.conditions === undefined ? []: field.conditions;
        this.gridsize    = field.gridsize;

        field.fields?.forEach( field => this.fields.push( new Field( this.fieldset, field ) ) );

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
     * @return value Value to set.
     * 
     * @since 1.0.0
     */
    public getValue() : any {
        return this.value;
    }

    /**
     * Get default value.
     * 
     * @return value Default value.
     * 
     * @since 1.0.0
     */
    public getDefaultValue() : any {
        if( this.defaultValue === undefined )
        {
            return;
        }
        
        let dynamicValue = new DynamicValue( this.fieldset.form, this.defaultValue );
        return dynamicValue.getValue();
    }

    /**
     * Get default value.
     * 
     * @return value Default value.
     * 
     * @since 1.0.0
     */
     public getDynamicValue() : any {
        if(  this.dynamicValue === undefined )
        {
            return;
        }
        
        let dynamicValue = new DynamicValue( this.fieldset.form, this.dynamicValue );
        return dynamicValue.getValue();
    }

    /**
     * Sets autovalues for default or dynamic value if exists.
     * 
     * @since 1.0.0
     */
    public autoValue()
    {
        if( this.value == undefined ) {
            this.value = this.getDefaultValue();
        }

        let dynamicValue = this.getDynamicValue();
        if( dynamicValue !== undefined )
        {
            this.value = dynamicValue;
        }
    }

    /**
     * Does field have choices.
     * 
     * @return True if it has choices, false if not.
     * 
     * @since 1.0.0
     */
    public hasChoices() : boolean 
    {
        return this.choices.length > 0;
    }

    /**
     * Is field a multi column field.
     * 
     * @returns True if it is multicol, false if not.
     * 
     * @since 1.0.0
     */
    public isMulticol(): boolean {
        return this.multicol > 0;
    }

    /**
     * Get multicol size.
     * 
     * @returns Multicol size.
     * 
     * @since 1.0.0
     */
    public getMultiColSize(): number {
        return this.multicol;
    }

    /**
     * Validate the field.
     * 
     * @return Array of errors, empty array on no errors.
     * 
     * @since 1.0.0
     */
    public validate() : string[] {
        if( ! this.conditionsFullfilled() ) return [];

        let validator = new Validator( this.value, this.validations );
        this.errors = validator.check();
        
        if ( this.errors.length > 0 ) {
            this.addClass( 'is-invalid' );
            this.removeClass( 'is-valid' );
        } else {
            this.addClass( 'is-valid' );
            this.removeClass( 'is-invalid' );
        }

        this.validated = true;

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
     * Checks if conditions are fullfilled.
     * 
     * @returns True if conditions are fullfilled, false if not.
     * 
     * @since 1.0.0
     */
    public conditionsFullfilled() : boolean {
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

    /**
     * Add input class.
     * 
     * @param string Name of css class to add.
     * 
     * @since 1.0.0
     */
    public addInputClass(name: string) {
        if( this.inputClasses.indexOf(name) !== -1) {
            return;
        }

        this.inputClasses.push(name);
    }

    /**
     * Remove input class.
     * 
     * @param string Name of css class to remove.
     * 
     * @since 1.0.0
     */
    public removeInputClass(name: string) {
        this.inputClasses = this.inputClasses.filter( className => className !== name );
    }

    /**
     * Get input classes.
     * 
     * @return String of CSS classes.
     * 
     * @since 1.0.0
     */
    public getInputClasses(): string {
        if( ! this.hasBeenValidated() ) {
            return this.inputClasses.join(' ');
        }

        if( ! this.hasValidationErrors() ) {
            this.addInputClass('is-valid');
            this.removeInputClass('is-invalid');
        } else {
            this.addInputClass('is-invalid');
            this.removeInputClass('is-valid');
        }

        return this.inputClasses.join(' ');
    }
}