# Field Types

## Input elements

### Text

A text field.

```json
{
    "name": "first-name",
    "label": "First Name",
    "type": "text"
}         
```

Parameters:

- **name** (string) Name of the field.
- **label** (string) Label which will be shown in frontend.
- **required** (true|false) Whether the field is required or not.
- **classes** (string) Additional CSS classes.
- **validations** (array) An array with [validations](/SvelteForms/json-structure/validation) which have to be passed.

### Textarea

A textarea field.

```json
{
    "name": "message",
    "label": "Your Message",
    "type": "textarea"
}         
```

Parameters:

- **name** (string) Name of the field.
- **label** (string) Label which will be shown in frontend.
- **required** (true|false) Whether the field is required or not.
- **classes** (string) Additional CSS classes.
- **validations** (array) An array with [validations](/SvelteForms/json-structure/validation) which have to be passed.

### Choice Select

A select field.

```json
{
    "name": "message",
    "label": "Your Message",
    "type": "choice-select",
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
}         
```

Parameters:

- **name** (string) Name of the field.
- **label** (string) Label which will be shown in frontend.
- **required** (true|false) Whether the field is required or not.
- **classes** (string) Additional CSS classes.
- **choices** (array) An array of [choices](#choices).
- **validations** (array) An array with [validations](/SvelteForms/json-structure/validation) which have to be passed.

### Choice Radio

A radio choice.

```json
{
    "name": "message",
    "label": "Your Message",
    "type": "choice-radio",
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
}         
```

Parameters:

- **name** (string) Name of the field.
- **label** (string) Label which will be shown in frontend.
- **required** (true|false) Whether the field is required or not.
- **classes** (string) Additional CSS classes.
- **choices** (array) An array of [choices](#choices).
- **validations** (array) An array with [validations](/SvelteForms/json-structure/validation) which have to be passed.

### Choice Image

An image choice.

```json
{
    "name": "message",
    "label": "Select Image",
    "type": "choice-image",
    "choices": [                        
        {
            "label": "Image 1",
            "value": "1",
            "url": ""
        },
        {
            "label": "Image 1",
            "value": "2",
            "url": ""
        }
    ]
}         
```

Parameters:

- **name** (string) Name of the field.
- **label** (string) Label which will be shown in frontend.
- **required** (true|false) Whether the field is required or not.
- **classes** (string) Additional CSS classes.
- **choices** (array) An array of [choices](#choices).
- **validations** (array) An array with [validations](/SvelteForms/json-structure/validation) which have to be passed.

### Choices

```json
[                        
    {
        "label": "Choice 1",
        "value": "1"
    },
    {
        "label": "Choice 2",
        "value": "2"
    },
    {
        "label": "Choice 3",
        "value": "3"
    }
]
```

### Range

## Content elements

### Headline

### Text