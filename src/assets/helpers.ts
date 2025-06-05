const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj)

type childs = any | any[] | string
 
export const el = ($el, children:childs = [], attrs): any => ({
   $el, 
   attrs,
   children
})
 
export const elIf = ({ $el, $if, $else }, children:childs = [], attrs): any => ({
   $el, 
   $if,
   $else,
   attrs,
   children
})
 
export const elFor = ({ $el, $for }, children:childs = [], attrs): any | any[] => ({
   $el, 
   $for, 
   attrs,
   children
})

export const sect = ($section, slot = [], attrs): any => ({
   $section,   
   slot,
   attrs
})