export function isNumberValid(value: number) {
    return value != undefined && value != null && !isNaN(value) && typeof value == 'number'
}