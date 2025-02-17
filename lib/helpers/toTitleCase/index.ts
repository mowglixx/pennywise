
export default function toTitleCase(str: string) {
    return str.replace(
        /([^\W_]+[^\s-]*) */g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}