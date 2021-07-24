/**
 * Mimics React's createElement recursively
 * @param type
 * @param props
 * @param children
 * @returns {{children: *[], type, props}|*}
 */
export function createElementDeep(type, props, ...children) {
  if (typeof type === 'function') {
    return type({
      ...props,
      children,
    });
  }
  return { type, props, children };
}

/**
 * Mimiks React's createElement
 * @param type
 * @param props
 * @param children
 * @returns {{children: *[], type, props}|(*&{children: *[], type})}
 */
export function createElementShallow(type, props, ...children) {
  if (typeof type === 'function') {
    return {
      type: type.name,
      ...props,
      children,
    };
  }
  return { type, props, children };
}
