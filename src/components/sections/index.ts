import _ from "lodash"
import { el, elFor } from "../../assets/helpers"
import { HTMLRenderer } from "../../services/HtmlRenderer"
import { matchRoute, pageResolvers } from '../../components/pages/index'
import { ResourceService } from '../../services/ResourceService'

export const sections = [
    {
      name: 'layout',
      datasource:{
        type: 'getAll',
        baseUrl: 'https://jsonplaceholder.typicode.com/users/2', 
        getOne: true,
      },
      content: (slot) => ({
        $el: 'main',
        attrs: {  },
        children: [
          el('navbar', [
            el('div', [ 
              el('a', 'DaisyUI', {class:'btn btn-ghost text-xl'})
            ], {class:'flex-1'}),
            el('div', [
              el('ul', [
                el('li', [el('a','Home', {href:'/'})]),
                el('li', [el('a','Pages', {href:'/page'})]),
                el('li', [el('a','Admin', {href:'/dash'})]),
                el('li', ['${layout.username}'],{class:'p-2'}),
                el('div', [
                  el('div', [
                    el('div', [
                      el('img', '', {src:'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'})
                    ], {class:'w-10 rounded-full'})
                  ], { tabindex:"0", role:"button", class:"btn btn-ghost btn-circle avatar" }),
                  el('ul', [
                    el('li', [
                      el('a', ['${layout.name}', el('span','New',{class:'badge'})]),
                      el('a', ['${layout.email}']),
                    ])
                  ], {tabindex:"0",class:"menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"})
                ], {class:'dropdown dropdown-end'}),
              ], {class:'menu menu-horizontal px-1'})
            ], { class:'flex-none' })
          ], {class:'navbar bg-base-100 shadow-sm'}),
          el('div', slot)
        ],
      }), 
    }, 
    {
      name: 'header',
      content: (slot) => ({
        $el: 'header',
        attrs: { class: 'py-4 border text-center' },
        children: ['Header Content'],
      }),
    },
    {
      name: 'footer',
      content: (slot) => ({
        $el: 'footer',
        attrs: { class: 'footer sm:footer-horizontal bg-neutral text-neutral-content p-10' },
        children: `
          <aside>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              class="fill-current">
              <path
                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>
              ACME Industries Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>
          <nav>
            <h6 class="footer-title">Social</h6>
            <div class="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="fill-current">
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="fill-current">
                  <path
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="fill-current">
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </nav>`,
      }),
    },
    {
      name: 'menu',
      content: (slot) => ({
        $el: 'nav',
        attrs: { class: 'menu' },
        children: [
          {
            $el: 'ul',
            attrs: { class: 'flex gap-4 my-2' },
            children: [
              {
                $el: 'li',
                children: [
                  { $el: 'a', attrs: { href: '/' }, children: ['Home'] },
                ],
              },
              {
                $el: 'li',
                children: [
                  { $el: 'a', attrs: { href: '/tables' }, children: ['About'] },
                ],
              },
              {
                $el: 'li',
                children: [
                  {
                    $el: 'a',
                    attrs: { href: '/grid' },
                    children: ['Contact'],
                  },
                ],
              },
            ],
          },
        ],
      }),
    },
    {
      name: 'table',
      content: (slot) => ({
        $el: 'table',
        attrs: {
          class: 'w-full whitespace-nowrap',
          'x-data': "{ search:'' }",
        },
        children: [
          {
            $el: 'thead',
            children: [
              {
                $el: 'tr',
                attrs: {
                  class: 'border-b border-gray-200',
                },
                children: [
                  {
                    $el: 'td',
                    attrs: {
                      colspan: '100%',
                    },
                    children: [
                      {
                        $el: 'input',
                        attrs: { placeholder: 'Search', 'x-model': 'search' },
                      },
                      { $el: 'span', attrs: { 'x-text': 'search' } },
                    ],
                  },
                ],
              },
              {
                $el: 'tr',
                attrs: {
                  class: 'border-b border-gray-200',
                },
                children: [
                  {
                    $el: 'th',
                    attrs: {
                      class: 'text-left py-3 px-4',
                    },
                    children: ['ID'],
                  },
                  {
                    $el: 'th',
                    attrs: {
                      class: 'text-left py-3 px-4',
                    },
                    children: ['Name'],
                  },
                  {
                    $el: 'th',
                    attrs: {
                      class: 'text-left py-3 px-4',
                    },
                    children: ['Email'],
                  },
                  {
                    $el: 'th',
                    attrs: {
                      class: 'text-left py-3 px-4',
                    },
                    children: ['Role'],
                  },
                  {
                    $el: 'th',
                    attrs: {
                      class: 'text-left py-3 px-4',
                    },
                    children: ['Status'],
                  },
                  {
                    $el: 'th',
                    attrs: {
                      class: 'text-left py-3 px-4',
                    },
                    children: ['Last Active'],
                  },
                ],
              },
            ],
          },
          {
            $el: 'tbody',
            $for: '$list2',
            children: [
              {
                $el: 'tr',
                attrs: {
                  class: 'border-b border-gray-200',
                },
                children: [
                  {
                    $el: 'td',
                    attrs: {
                      class: 'py-3 px-4',
                    },
                    children: ['${$row.id}'],
                  },
                  {
                    $el: 'td',
                    attrs: {
                      class: 'py-3 px-4',
                    },
                    children: ['${$row.name}'],
                  },
                  {
                    $el: 'td',
                    attrs: {
                      class: 'py-3 px-4',
                    },
                    children: ['${$row.email}'],
                  },
                  {
                    $el: 'td',
                    attrs: {
                      class: 'py-3 px-4',
                    },
                    children: ['$isAdmin'],
                  },
                  {
                    $el: 'td',
                    attrs: {
                      class: 'py-3 px-4',
                    },
                    children: [
                      {
                        $el: 'span',
                        attrs: {
                          class:
                            'px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm',
                        },
                        children: ['Active'],
                      },
                    ],
                  },
                  {
                    $el: 'td',
                    attrs: {
                      class: 'py-3 px-4',
                    },
                    children: ['Today at 2:15 PM'],
                  },
                ],
              },
            ],
          },
        ],
      }),
    },
    {
      name: 'grid-products',
      datasource:{
        type: 'getAll',
        baseUrl: 'https://jsonplaceholder.typicode.com/albums/1/photos?_limit=4',  
      },
      content: (slot) => el('div', [
        elFor({$el:'div', $for:'grid-products.data' }, [`  
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div class="card-body"> 
              <p><%- $row.title %></p>
              <div class="card-actions justify-end">
                <a href="/page/<%- $row.id %>" class="btn btn-link">Buy Now</a>
              </div>
            </div> 
        `], {class:'card bg-base-100 w-full shadow-sm'}),
      ], slot)

    }
  ];

export const datasourceResolver = async (datasource, context) => {
  try {
    const dtType = _.get(datasource, 'type', 'getAll')
    const service = new ResourceService(datasource);
    return await service[dtType](context)
  } catch (error) {
    return { error: error.message }
  }
}
  
export const sectionResolver = async (slug, children = [], data = {}) => { 
  const section = sections.find((section) => section.name === slug);
  if(!section) return 'error';
  const content = section.content(children) || ''
  const renderer = new HTMLRenderer(content, pageResolvers); 
  const context = section.datasource ? await datasourceResolver(section.datasource, data) : {} 
  const rendered = await renderer.getSchema(Object.assign(data, { [slug]: context })) 
  return rendered
};
  