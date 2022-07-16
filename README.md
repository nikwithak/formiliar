# formiliar
A library for rapidly creating forms in react. Pass a list of `FormField`s into the component, and the `formiliar` component will generate the form, handle client-side validation (with errors), and pass the resulting form fields to the `onSubmit` function.

### Screenshots


![Generated Form](/screenshots/generated_form.png?raw=true "Generated Form")
![Validation Errors](/screenshots/validation.png?raw=true "Validation Errors")

## Usage
```typescript
function SimpleContactForm() {

    function handleSubmit(form_fields) {
        console.log(JSON.stringify(form_fields, "", 2));
        /*
            Output: 
            {
                "name": "Theodore Puppaloneus",
                "email": "email@email.email",
                "message": "This message is at least 20 characters"
            }
        */
    }

    let fields = {
        "name": {
            type: "text",
            label: "Your Name",
            placeholder: "Theodore Puppaloneus",
            initialValue: "",
            required: true,
        },
        "email": {
            type: "text",
            label: "Email Address",
            placeholder: "email@email.email",
            initialValue: "",
            validation: (v: string) =>
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v)
                    ? null
                    : "Please enter a valid email address."
            ,
            required: true,
        },
        "message": {
            type: "textarea",
            label: "Your Message",
            placeholder: "Freeform text goes here",
            initialValue: "",
            validation: (v: string) =>
                v.length < 20
                ? "Your message must be at least 20 characters long."
                : null,
            required: true,
        },
    };
    
    return (
      <FormCreator
        onSubmit={handleSubmit}
        fields={fields}
      />
    );
}

```

### Implementation Notes
This was created for my own needs after finding myself writing the same Form handling code over and over. It is very much a WIP. I plan to add more input types and better form controls in the future.

Currently it is hardcoded for use with (bulma.io)[https://www.bulma.io) CSS classes. Eventually I plan to add more customization and the ability to use your own CSS classes.
