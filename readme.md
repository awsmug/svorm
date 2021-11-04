# SvelteForm

This is a form framework based on svelte and typescript.

## Install SvelteForm

Download the repository and run npm to install all necessary packages.

```cmd
git clone git@github.com:awsmug/SvelteForm.git && cd SvelteForm && npm i
```

## Use SvelteForm as npm depency

```cmd
npm i awsmug/SvelteForm
```


## Form

The form is the base wrapper for all content. It contains all settings. The form must contain the paramater *fieldsets*.

```json
{
    "fieldsets": [
       /* ... */
    ]
}
```

List of *form* parameters:

- **name** - Name of the form, used in HTML form tag.
- **start** - ID the fieldset where the form will start.

## Fieldsets

The fieldset is  a set if elements which will be shown. The form can only showo one fieldset at a time. This is the current fieldset.

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

### Start fieldset
You can have multiple fieldsets. If you have more than one fieldset, the form starts with the first fieldset occuring in the fieldsets array. You also can set a start fieldset.

```json
{
    "start": "part-two",
    "fieldsets": [
        {
            "label": "I will be skipped",
            "name": "part-one",
            "fields": [
                {
                    "name": "name",
                    "label": "Tell us your name",
                    "type": "text"
                }
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


## Components

### Input elements

#### Text

#### Textarea

#### Choice Select

#### Choice Radio

#### Choice Image

#### Range

### Content elements

## Validation

### How to validate

### Validation types

## Conditional logic

Conditionall logic allows you to **show** or **hide** elements depending on content of input fields. 

Here is an example of a text element which is shown depending on the value of the choice of the input with the name *show*.

```js
{
    "name": "test-form",
    "start": "conditional-logic",
    "fieldsets": [
        {
            "label": "Conditional Logic",
            "name": "conditional-logic",
            "fields": [
                {
                    // Input: Radio choice with yes or no
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
                    // Element: Text which is shown depending on input element
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