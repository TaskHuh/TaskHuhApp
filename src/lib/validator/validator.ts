// this validator parrots the validator from my greenlight repo
// it is intended to validate the command options

export type Validator = {
    // map of errors, 
    // the key is the value that wasnt validated
    // the value is the message to be returned
    Errors: Map<string, string>
    // used to check if an instance of a validator is valid
    valid: () => boolean;
    // used to add an error to the validator
    addError: (key: string, message: string) => void;
    // adds an error if the ok value is not true
    check: (ok: boolean, key: string, message: string) => void;
}

// validator factory
export const newValidator = () => {
    return {
        Errors: new Map<string, string>(),

        valid(): boolean {
            return this.Errors.size === 0
        },

        addError(key: string, message: string): void {
            this.Errors.set(key, message)
        },

        check(ok: boolean, key: string, message: string): void {
            if (!ok) {
                this.addError(key, message)
            }
        },
    }
}

// Example usage:
// const myValidator = newValidator()
// myValidator.check(true, 'title', 'Title is required')
// myValidator.check(false, 'title', 'Title is required')
// console.log(myValidator.valid())
// console.log(myValidator.Errors)

// HELPERS

// returns true if a value is in an array of comparable values
export function PermittedValue<T>(value: T, array: T[]): boolean {
    return array.includes(value)
}

// returns true if a value matches a specfic regex pattern
export function RegexMatch(value: string, regex: RegExp): boolean {
    return regex.test(value)
}

// returns true if all the values in an array are unique
export function UniqueValues<T>(array: T[]): boolean {
    return new Set(array).size === array.length
}
