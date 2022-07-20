import type HasFieldData from './Interfaces/HasFieldData';
import type HasHelpData from './Interfaces/HasHelpData';
import type Fieldset from './Fieldset';
import type HasChoicesData from './Interfaces/HasChoicesData';
import CSSElement from './Abstract/CSSElement';
import Help from './Help';
import Validations from './Helpers/Validations';
import Conditions from './Helpers/Conditions';
import Replacements from './Helpers/Replacements';
import DynamicValue from './Helpers/DynamicValue';

/**
 * Field class.
 * 
 * @since 1.0.0
 */
export default class Field extends CSSElement {
    readonly fieldset: Fieldset;
    readonly fields: Field[] = [];

    readonly type: string;
    readonly name: string;
    readonly label: string;
    readonly prefix: string;
    readonly suffix: string;
    readonly placeholder: string;
    readonly choices: HasChoicesData[];
    readonly conditions: Conditions;
    readonly validations: Validations;
    readonly replacements: Replacements;
    readonly help: HasHelpData;
    readonly params: any;
    readonly paramsCallback: any;
    readonly valueDefault: any;
    readonly valueCallback: any;

    public value: any;
    private dynamicValue: DynamicValue;
    private validated: boolean = false;
    private inputClasses: string[] = [];

    /**
     * Initializing field.
     * 
     * @param name  Name of the field.
     * @param field Field object
     * 
     * @since 1.0.0
     */
    public constructor(
        fieldset: Fieldset,
        field: HasFieldData
    ) {
        super();

        this.fieldset = fieldset;

        this.name = field.name;
        this.type = field.type;
        this.label = field.label;
        this.prefix = field.prefix;
        this.suffix = field.suffix;
        this.placeholder = field.placeholder;
        this.choices = field.choices;

        this.value = field.value;

        this.dynamicValue = new DynamicValue(
            this.fieldset.form,
            this.value,
            field.valueField !== undefined ? field.valueField : undefined,
            field.valueDefault !== undefined ? field.valueDefault : undefined,
            field.valueCallback !== undefined ? field.valueCallback : undefined
        );

        this.autoValue();

        this.validations = new Validations(
            this, 
            field.validations !== undefined ? field.validations : []
        );

        this.replacements = new Replacements(
            this, 
            field.replacements !== undefined ? field.replacements : []
        );

        this.conditions = new Conditions(
            this.fieldset.form,
            field.conditions !== undefined ? field.conditions : []
        );

        this.help = field.help === undefined ? undefined : new Help(field.help);

        field.classes?.forEach(className => this.addClass(className));
        field.fields?.forEach(subField => this.fields.push(new Field(this.fieldset, subField)));

        this.addClass('field-' + this.type);
    }

    /**
     * Sets autovalues for default or dynamic value if exists.
     * 
     * @since 1.0.0
     */
    public autoValue() {
        this.value = this.dynamicValue.get();
    }

    /**
     * Does field have choices.
     * 
     * @return True if it has choices, false if not.
     * 
     * @since 1.0.0
     */
    public hasChoices(): boolean {
        return this.choices.length > 0;
    }

    /**
     * Validate the field.
     * 
     * @return Array of errors, empty array on no errors.
     * 
     * @since 1.0.0
     */
    public validate(): string[] {
        if (!this.conditions.fullfilled()) return []; // Do not validate if field is not shown.

        this.replacements.replace();
        this.validations.validate();

        if (this.validations.hasErrors()) {
            this.addClass('is-invalid');
            this.removeClass('is-valid');
        } else {
            this.addClass('is-valid');
            this.removeClass('is-invalid');
        }

        this.validated = true;

        return this.validations.getErrors();
    }

    /**
     * Has the field already ben validated
     * 
     * @return True if field has been validated, false if not.
     * 
     * @since 1.0.0
     */
    public hasBeenValidated(): boolean {
        return this.validated;
    }

    /**
     * Add input class.
     * 
     * @param string Name of css class to add.
     * 
     * @since 1.0.0
     */
    public addInputClass(name: string) {
        if (this.inputClasses.indexOf(name) !== -1) {
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
        this.inputClasses = this.inputClasses.filter(className => className !== name);
    }

    /**
     * Get input classes.
     * 
     * @return String of CSS classes.
     * 
     * @since 1.0.0
     */
    public getInputClasses(): string {
        if (!this.hasBeenValidated()) {
            return this.inputClasses.join(' ');
        }

        if (!this.validations.hasErrors()) {
            this.addInputClass('is-valid');
            this.removeInputClass('is-invalid');
        } else {
            this.addInputClass('is-invalid');
            this.removeInputClass('is-valid');
        }

        return this.inputClasses.join(' ');
    }
}