import type HasFieldData from '../Interfaces/HasFieldData';
import type HasConditionData from "../Interfaces/HasConditionData";
import type HasHelpData from '../Interfaces/HasHelpData';
import type Fieldset from './Fieldset';
import Help from './Help';
import Validator from './Validator';
import type HasChoicesData from '../Interfaces/HasChoicesData';
import type HasValidationData from '../Interfaces/HasValidationData';
import DynamicValue from './DynamicValue';

var startedMulticol = false;

/**
 * Field class.
 * 
 * @since 1.0.0
 */
export default class Field implements HasFieldData {
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
    readonly gridsize   : number;

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

        if( field.fields !== undefined ) {
            field.fields.forEach( field => {
                this.fields.push( new Field( this.fieldset, field ) );
            });
        }

        this.value        = field.value;
        this.classes      = field.classes === undefined ? []: field.classes;
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
        let genericClasses = [ 'input', 'input-' + this.type ];
        if( this.gridsize !== undefined ) {
            genericClasses.push('col-' + this.gridsize);
        }
        let classes = genericClasses.concat( this.classes );
        
        return classes.join(' ');
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
     * Returns multicol HTML.
     * 
     * @returns Multicol HTML.
     * 
     * @since 1.0.0
     */
    public getMulticolHTML(): string{
        console.log( 'Global: ' + startedMulticol );
        console.log( this.name + ' is Multicol: ' + this.isMulticol() );

        if( this.isMulticol() && startedMulticol === false) {
            startedMulticol = true;
            console.log(this.name + '<div class="row">');
            return '<div class="row">';
        }

        if( ! this.isMulticol() && startedMulticol === true) {
            startedMulticol = false;
            console.log(this.name + '</div>');
            return '</div>';
        }

        console.log('NOTHING');

        return '';
    }

    /**
     * Validate the field.
     * 
     * @return Array of errors, empty array on no errors.
     * 
     * @since 1.0.0
     */
    public validate() : string[] {
        if( ! this.conditionsFullfilled() )
        {
            return [];
        }

        let validator = new Validator( this.value, this.validations );
        this.errors = validator.check();
        
        if ( this.errors.length > 0 ) {
            this.addClass( 'error' );
            this.removeClass( 'validated' )
        } else {
            this.removeClass( 'error' );
            this.addClass( 'validated' );
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
     * Conditions fullfilled.
     * 
     * @return True if fullfilled, false if not.
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
}