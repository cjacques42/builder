export default function (window = []) {
    const entries = window.filter(rule => rule.active).map(rule => [rule.property, rule.value])
    return Object.fromEntries(entries)
}