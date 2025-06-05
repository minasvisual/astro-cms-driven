import { el, sect } from "../../assets/helpers";

const hero  =  {
  img: 'https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp',
  text: `Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi`
}

const slides = [
  [1, 'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',],
  [2, 'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp',],
  [3, 'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp',],
  [4, 'https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp',],
]


export const homeSchema = sect('layout', [
  el('section', [
    el('div','',{class:'hero-overlay'}),
    el('div',[
      el('div', [
        el('div', 'Hello there', {class:'mb-5 text-5xl font-bold'}),
        el('p', hero.text, {class:'mb-5'}),
        el('button', 'Get Started', {class:'btn btn-primary'}),
      ], {class:'max-w-md'})
    ],{class:'hero-content text-neutral-content text-center'})
  ], { class:'hero min-h-screen', style:`background-image: url(${hero.img})`}),
  el('section', [
    el('h1', 'Amazing features for to make your work easier', {class:'text-4xl text-center py-5 font-bold'}), 
    el('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus.', {  }), 
  ], {class:'container m-auto w-1/2 text-center py-5'}),
  el('section', 
    slides.map(row => 
      el('div', [
        el('img', '',{src: row[1], class:'w-full'}),
        el('div', [
          el('a', '❮', {href:`#slide${row[0]-1}`, class:'btn btn-circle'}),
          el('a', '❯', {href:`#slide${row[0]+1}`, class:'btn btn-circle'}),
        ], { class:'absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'})
      ], {id:`slide${row[0]}`, class:'carousel-item relative w-full'})
    ), {class:'carousel w-full'}),
  el('section', [
    el('div', [
      el('img', '', {src:"https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",class:"max-w-sm rounded-lg shadow-2xl"}),
      el('div', [
        el('h1', 'Box Office News!', {class:"text-5xl font-bold"}),
        el('div', `Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.`, {class:'py-6'}),
        el('button', 'Get started', {class:'btn btn-primary'})
      ], )
    ], {class:"hero-content flex-col lg:flex-row"})
  ], {class:"hero bg-white py-5 my-8 container m-auto"}), 
  el('section', [
    el('div', [
      el('div', [
        el('h1', 'Box Office News!', {class:"text-5xl font-bold"}),
        el('div', [
          el('p', `Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.`),
          el('a', 'See all >', {class:'btn btn-link', href:'/page'})
        ], {class:'flex py-6'}), 
      ], ),
      sect('grid-products', {class:"hero-content flex-col lg:flex-row gap-4"})
    ], {class:"flex-col lg:flex-row p-3"})
  ], {class:"hero bg-white py-5 my-8 container m-auto"}),

  sect('footer', [])
])
   