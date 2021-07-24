"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElementShallow = exports.createElementDeep = void 0;
/**
 * Mimics React's createElement recursively
 * @param type
 * @param props
 * @param children
 * @returns {{children: *[], type, props}|*}
 */
function createElementDeep(type, props, ...children) {
    if (typeof type === 'function') {
        return type({
            ...props,
            children,
        });
    }
    return { type, props, children };
}
exports.createElementDeep = createElementDeep;
/**
 * Mimiks React's createElement
 * @param type
 * @param props
 * @param children
 * @returns {{children: *[], type, props}|(*&{children: *[], type})}
 */
function createElementShallow(type, props, ...children) {
    if (typeof type === 'function') {
        return {
            type: type.name,
            ...props,
            children,
        };
    }
    return { type, props, children };
}
exports.createElementShallow = createElementShallow;
//# sourceMappingURL=createElement.js.map