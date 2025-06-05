import { el, elIf, sect } from "../../assets/helpers";

const post = { name:'Post ${params.id}', pic: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'}

export const dynamicSchema = sect('layout', 
    [
        el('div', [
            el('h1', post.name),
            el('a', '< Pages', { href:'/page', class:'btn' })
        ], { class:'flex justify-between container m-auto' }),
        el('div', [
            el('img', '', { src:post.pic, class:'w-full max-h-[500px]' }),
            post.name + ' image',
            el('div', [
                el('a', 'Subitem 1', {href:'/page/${params.id}/test/1', class:'bg-blue-500 text-white py-2 px-4 rounded'}),
                el('a', 'Subitem 2', {href:'/page/${params.id}/test/2', class:'bg-blue-500 text-white py-2 px-4 rounded'}),
                el('a', 'Subitem 3', {href:'/page/${params.id}/test/3', class:'bg-blue-500 text-white py-2 px-4 rounded'}),
            ], { class:'flex gap-2 py-4'}),
            elIf({
                $el:'div',
                $if:'${params.id2 !== undefined}'
            }, [
                "Sub item ${params.id2}"
            ])
        ], {class:'card-image container m-auto'})
    ]
)
 