const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj)
 
export const el = ($el, children = [], attrs) => ({
   $el, 
   attrs,
   children
})
 
export const elIf = ({ $el, $if, $else }, children = [], attrs) => ({
   $el, 
   $if,
   $else,
   attrs,
   children
})
 
export const elFor = ({ $el, $for }, children = [], attrs) => ({
   $el, 
   $for, 
   attrs,
   children
})