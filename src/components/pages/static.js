import { el, sect } from "../../assets/helpers";
  
export const staticSchema = sect('layout', [ 
    el('div', [
        el('h1', 'Pages'),
        el('a', '< Home', { href:'/', class:'btn btn-link' })
    ], { class:'flex justify-between container m-auto' }),
    el('hr'), 
    sect('grid-products', {class:"flex flex-col md:flex-row gap-4 container m-auto py-4"}),
    el('div',[], {class:'min-h-[30vh]'}),
    sect('footer', [], {class:"fixed bottom-0"}),
])
 
 