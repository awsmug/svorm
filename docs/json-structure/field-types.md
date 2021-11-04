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

- **id** (string) ID of the field.
- **label** (string) Label which will be shown in frontend.
- **required**: (true|false) Whether the field is required or not.
- **classes**: (string) Additional CSS classes.

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

- **id** (string) ID of the field.
- **label** (string) Label which will be shown in frontend.
- **required**: (true|false) Whether the field is required or not.
- **classes**: (string) Additional CSS classes.

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

- **id** (string) ID of the field.
- **label** (string) Label which will be shown in frontend.
- **required**: (true|false) Whether the field is required or not.
- **classes**: (string) Additional CSS classes.
- **choices**: (array) An array of choices.

### Choice Radio

### Choice Image

### Range

## Content elements

### Headline

### Text