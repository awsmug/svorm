# SvelteForm

Create a svelte form by using a json config file.

## Install SvelteForm

## Initializing a form

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

```js
{
    "name": "test-form",
    "start": "conditional-logic",
    "classes": [ "test-form" ],
    "fieldsets": [
        {
            "label": "Conditional Logic",
            "name": "conditional-logic",
            "fields": [
                {
                    "name": "show",
                    "label": "Show Textfield",
                    "type": "choice-radio",
                    "classes": [ "w1of1" ], 
                    "required": true,
                    "choices": [                        
                        {
                            "label": "Yes",
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