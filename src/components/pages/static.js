import { el } from "../../assets/helpers";

const posts = [
    { id:1, name:'Post 1', pic: 'https://placehold.co/600x400'},
    { id:2, name:'Post 2', pic: 'https://placehold.co/600x400'},
    { id:3, name:'Post 3', pic: 'https://placehold.co/600x400'},
    { id:4, name:'Post 4', pic: 'https://placehold.co/600x400'},
]

export const staticSchema = el('h1', [
    'Pages',
    el('sl-divider'),
    el('div', posts.map(item => 
        el('sl-card', [
            el('img', '', { slot:'image', src: item.pic }),
            el('a', item.name, { href:`/page/${item.id}` })
        ], {class:"card-image"})
    ), { class:'grid grid-cols-3 gap-4', href:'' }),
])
 
 