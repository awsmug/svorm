# Conditional Logic


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