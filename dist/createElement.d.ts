/**
 * Mimics React's createElement recursively
 * @param type
 * @param props
 * @param children
 * @returns {{children: *[], type, props}|*}
 */
export function createElementDeep(type: any, props: any, ...children: any[]): {
    children: any[];
    type;
    props;
} | any;
/**
 * Mimiks React's createElement
 * @param type
 * @param props
 * @param children
 * @returns {{children: *[], type, props}|(*&{children: *[], type})}
 */
export function createElementShallow(type: any, props: any, ...children: any[]): {
    children: any[];
    type;
    props;
} | (any & {
    children: any[];
    type;
});
