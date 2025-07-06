// this validator parrots the validator from my greenlight repo
// it is intended to validate the command options

export type Validator = {
    // map of errors, 
    // the key is the value that wasnt validated
    // the value is the message to be returned
    Errors: Map<string, string>
    // newable; new Validator
    new(): Validator
    // used to check if an instance of a validator is valid
    valid: () => boolean;
}

// SEE GPT comment for this about making it into a factory or using prototypes