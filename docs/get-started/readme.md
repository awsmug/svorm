# Get started

## Installation

Svorm can be installed by using the node package manager *npm*.

```cmd
npm i @svenwagener/svorm
```

## Add scripts to HTML

1. Add HTML into to your HTML header.

```html
<script defer src="/node_modules/@svenwagener/svorm/dist/svorm.js"></script>
<link rel="stylesheet" href="/node_modules/@svenwagener/svorm/dist/svorm.css" />
```

2. Add a form json to you project. For example in a file named form.json.

```json
{
    "name": "test-form",
    "start": "test-fieldset",
    "fieldsets": [
        {
            "label": "Test fieldset",
            "name": "test-fieldset",
            "fields": [
                {
                    "name": "a-textfield",
                    "label": "A Textfield",
                    "type": "text"
                }
            ]
        }
    ]
}
```

3. Include JSON config file to your HTML body.

```html
<div data-component="form" data-form="form.json"></div>
```