# JSON Structure

The JSON file allows you to define a form via a json config file.

```json
{
    "fieldsets": [
    ]
}
```

List of *form* parameters:

- **name** - Name of the form, used in HTML form tag.
- **start** - ID the fieldset where the form will start.

### Fieldset

The fieldsets param is an array of fieldsets which will be shown. The form can only show one fieldset at a time which is the *current fieldset*.

The single fieldset must contain a label, an id and the fields parameter.

```json
{
    "label": "Fieldset Label",
    "name": "my-fieldset",
    "fields": [
    ]
}
```

#### Fieldset Start

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

### Field

A field can be an input or a content field and have to be placed in the fields array of the fieldset.

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

- **See**: [Field Types](/SvelteForm/field-types) 

