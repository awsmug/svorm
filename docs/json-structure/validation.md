# Validation

## How to validate

```json
[
    {
        "type": "string",
        "error": "This is no string"
    },
    {
        "type": "minLength",
        "value": 3,
        "error": "String is too short"
    },
    {
        "type": "maxLength",
        "value": 100,
        "error": "String is too long"
    }
]
```

## Validation types