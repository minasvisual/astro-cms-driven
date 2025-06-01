export const sections = [
  {
    name: 'header',
    content: {
      $el: 'header',
      attrs: { class: 'py-4 border text-center' },
      children: ['Header Content'],
    },
  },
  {
    name: 'footer',
    content: {
      $el: 'footer',
      attrs: { class: 'py-4 border text-center' },
      children: ['Footer Content'],
    },
  },
  {
    name: 'menu',
    content: {
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
    },
  },
  {
    name: 'table',
    content: {
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
    },
  },
];

export const sectionResolver = async (slug) => {
  return sections.find((section) => section.name === slug)?.content || '';
};
