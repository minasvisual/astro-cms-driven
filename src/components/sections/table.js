export const tableBuilder = (data, config) => ({
  $el: "table",
  attrs: {
    class: "table-auto w-full whitespace-nowrap",
  },
  children: [
    {
      $el: "thead",
      children: [
        {
          $el: "tr",
          attrs: {
            class: "border-b border-gray-200",
          },
          children: [
            {
              $el: "th",
              children: ["ID"],
              attrs: { class: "text-left py-3 px-4" },
            },
            {
              $el: "th",
              children: ["Título"],
              attrs: { class: "text-left py-3 px-4" },
            },
            {
              $el: "th",
              children: ["Fonte"],
              attrs: { class: "text-left py-3 px-4" },
            },
            {
              $el: "th",
              children: ["Ações"],
              attrs: { class: "text-right py-3 px-4" },
            },
          ],
        },
      ],
    },
    {
      $el: "tbody",
      attrs: { class: "" },
      children: [
        {
          $el: "tr",
          attrs: {
            class: "border-b border-gray-200",
          },
          $for: "$data",
          children: [
            {
              $el: "td",
              attrs: { class: "py-3 px-4" },
              children: "${$row.id}",
            },
            {
              $el: "td",
              attrs: { class: "py-3 px-4" },
              children: "${$row.title}",
            },
            {
              $el: "td",
              attrs: { class: "py-3 px-4" },
              children: "${$row.source}",
            },
            {
              $el: "td",
              attrs: { class: "py-3 px-4 text-right" },
              children: ["buttons"],
            },
          ],
        },
      ],
    },
    {
      $el: "tfoot",
      children: [
        {
          $el: "tr",
          attrs: {
            class: "border-t border-gray-200",
          },
          children: [
            {
              $el: "td",
              attrs: {
                class: "py-3 px-4 text-right",
              },
              children: [
                {
                  $el: "a",
                  attrs: {
                    class: "btn btn-primary",
                    href: "/kanbam?page=${ query.page > 1 ? Number(query.page ?? 1) - 1 : 1 }",
                  },
                  children: ["Prev"],
                },
              ],
            },
            {
              $el: "td",
              attrs: {
                colspan: "10",
                class: "py-3 px-4 text-center",
              },
              children: [
                "Page ",
                "${query.page} of ${ Math.round(Number(total) / query.limit) }",
              ],
            },
            {
              $el: "td",
              attrs: {
                class: "py-3 px-4 text-left",
              },
              children: [
                {
                  $el: "a",
                  attrs: {
                    class: "btn btn-primary",
                    href: "/kanbam?page=${ Number(query.page || 1) + 1 }",
                  },
                  children: ["Next"],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})