import { el, elIf } from "../../assets/helpers";

const post = { name:'Post ${params.id}', pic: 'https://placehold.co/600x400'}

export const dynamicSchema = el('div', [
    el('h1', post.name),
    el('sl-card', [
        el('img', '', { src:post.pic, slot:'image' }),
        post.name + ' image',
        el('sl-menu', [
            el('a', 'Subitem 1', {href:'/page/${params.id}/test/1', class:'bg-blue-500 text-white py-2 px-4 rounded'}),
            el('a', 'Subitem 2', {href:'/page/${params.id}/test/2', class:'bg-blue-500 text-white py-2 px-4 rounded'}),
            el('a', 'Subitem 3', {href:'/page/${params.id}/test/3', class:'bg-blue-500 text-white py-2 px-4 rounded'}),
        ], { class:'flex gap-2'}),
        elIf({
            $el:'div',
            $if:'${params.id2 !== undefined}'
        }, [
            "Sub item ${params.id2}"
        ])
    ], {class:'card-image'})
])
 