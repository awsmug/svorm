import type Form from './Form';
import type HasFieldsetData from '../Interfaces/HasFieldsetData';
import type HasConditionData from '../Interfaces/HasConditionData';

import Field from './Field';
import type HasSubmissionData from '../Interfaces/HasSubmissionData';
import CSSElement from './CSSElement';


/**
 * Class Fieldset.
 * 
 * @since 1.0.0
 */
export default class Fieldset extends CSSElement {
    readonly form          : Form;
    readonly name          : string;
    readonly label         : string;
    readonly percentage    : number;
    readonly params        : [];
    readonly conditions    : HasConditionData[];
    readonly submission    : HasSubmissionData | undefined;

    readonly nextFieldset: string;
    readonly prevFieldset: string;

    readonly fields      : Field[] = [];
   
    /**
     * @param fieldset Fieldset data.
     * Initializing fieldset.
     * 
     * @param form Form object.
     * 
     * @since 1.0.0
     */
    public constructor( form: Form, fieldset: HasFieldsetData ) {
        super();
        
        this.form           = form;
        this.name           = fieldset.name;
        this.label          = fieldset.label;
        this.percentage     = fieldset.percentage;
        this.params         = undefined === fieldset.params ? []: fieldset.params;
        this.conditions     = undefined === fieldset.conditions ? []: fieldset.conditions;
        this.submission     = fieldset.submission;

        this.nextFieldset = fieldset.nextFieldset;
        this.prevFieldset = fieldset.prevFieldset;

        this.addClass('fieldset-' +  this.name);

        fieldset.classes?.forEach( className => this.addClass(className) );
        fieldset.fields.forEach( field => this.fields.push( new Field( this, field ) ) );
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
            let field = this.form.getField( condition.field );

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
     * Get a specific field.
     * 
     * @param name Name of field.
     * @return Field object. Undefined if nothing was found.
     * 
     * @since 1.0.0
     */
     public getField( name: string ) : Field {
        let foundField;

        this.fields.forEach( ( field: Field ) => {
            if( field.type === 'group') {
                field.fields.forEach( (field: Field) => {
                    if( field.name === name ) {
                        foundField = field;
                    }
                });
            } else if( field.name === name ) {
                foundField = field;
            }
        });

        return foundField;
    }

    /**
     * Validate fieldset.
     * 
     * @return True on successful validation, false on errors.
     * 
     * @since 1.0.0
     */
    public validate () : boolean {
        let foundError = false;
        this.fields.forEach( ( field: Field, i ) => {
            if( field.type === 'group') {
                field.fields.forEach( (field: Field) => {
                    if( field.validate().length > 0 && ! foundError  ) {
                        foundError = true;   
                    }
                }); 
            } else if ( field.validate().length > 0 && ! foundError ) {
                foundError = true;                
            }
        });

        return foundError;
    }

    /**
     * Has fieldset validation errors.
     * 
     * @return True if fieldset has errors, false if not.
     * 
     * @since 1.0.0
     */
    public hasValidationErrors() : boolean {
        let foundError = false;
        this.fields.forEach( ( field: Field ) => {
            if( field.type === 'group') {
                field.fields.forEach( (field: Field) => {
                    if( field.hasValidationErrors() && ! foundError  ) {
                        foundError = true;   
                    }
                });
            } else if( field.hasValidationErrors() && ! foundError ) {
                foundError = true;
            }
        });

        return foundError;
    }
}