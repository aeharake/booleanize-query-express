import isCamelCase from 'check-camelcase';

export const isCamel = (input: string) => {
    return isCamelCase(input) && input.charAt(0).toLowerCase() === input.charAt(0);
}