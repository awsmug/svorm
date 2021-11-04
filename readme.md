# SvelteForm

This is a form framework based on svelte and typescript.

## Get started

### Installation

Download the repository and run npm to install all necessary packages.

```cmd
git clone git@github.com:awsmug/SvelteForm.git && cd SvelteForm && npm i
```

### Use SvelteForm as npm depency

```cmd
npm i awsmug/SvelteForm
```

## JSON Documentation

The root is the base wrapper for all content. It contains all settings for the form: Where it starts, where the data will be sent behavour, style and so on. The form at least must contain the paramater *fieldsets*.

```json
{
    "fieldsets": [
    ]
}
```

List of *form* parameters:

- **name** - Name of the form, used in HTML form tag.
- **start** - ID the fieldset where the form will start.

### Fieldsets

The fieldsets param is an array of fieldsets which will be shown. The form can only show one fieldset at a time which is the *current fieldset*.

The single fieldset must contain a label, an id and the fields parameter.

```json
{
    "fieldsets": [
        {
            "label": "Fieldset Label",
            "name": "my-fieldset",
            "fields": [
            ]
        }
    ]
}
```

#### Start fieldset

If you have more than one fieldset, the form starts with the first fieldset occuring in the fieldsets array. You also can set a start fieldset.

```json
{
    "start": "part-two",
    "fieldsets": [
        {
            "label": "I will be skipped",
            "name": "part-one",
            "fields": [
            ]
        },
        {
            "label": "Here we are starting",
            "name": "part-two",
            "fields": [
                {
                    "name": "content",
                    "label": "Tell us why you are here",
                    "type": "textarea"
                }
            ]
        }
    ]
}
```

### Element

An element can be an input field or content which have to be shown. 

```json
{
    "fieldsets": [
        {
            "label": "Fieldset Label",
            "name": "my-fieldset",
            "fields": [
                {
                    "name": "content",
                    "label": "Tell us why you are here",
                    "type": "textarea"
                }
            ]
        }
    ]
}
```

### Components

#### Input elements

##### Text

##### Textarea

##### Choice Select

##### Choice Radio

##### Choice Image

##### Range

#### Content elements

### Validation

#### How to validate

#### Validation types

### Conditional logic

Conditionall logic allows you to **show** or **hide** elements depending on content of input fields. 

Here is an example of a text element which is shown depending on the value of the choice of the input with the name *show*.

```json
{
    "name": "test-form",
    "start": "conditional-logic",
    "fieldsets": [
        {
            "label": "Conditional Logic",
            "name": "conditional-logic",
            "fields": [
                {
                    "name": "show",
                    "label": "Show Textfield",
                    "type": "choice-radio",
                    "choices": [                        
                        {
                            "label": "Ja",
                            "value": "yes"
                        },
                        {
                            "label": "No",
                            "value": "no"
                        }
                    ]
                },
                {
                    "name": "my-text",
                    "value": "You can see me!",
                    "type": "headline",
                    "conditions": [
                        {
                            "field": "show",
                            "value": "yes",
                            "operator": "=="
                        }
                    ]
                }
            ]
        }
    ]
}
```