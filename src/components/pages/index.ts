import { dashSchema } from "./dashboard"
import { dynamicSchema } from "./dynamic"
import { staticSchema } from "./static"

export const baseSchema = (schemas) => ({
   $el: 'section',
   children: [
    {
      $el: 'h1',
      attrs: {
        class: 'text-3xl font-bold mb-4'
      },
      children: schemas
    }, 
  ]
})
  
const page1 = baseSchema('Page1')
const page1test = baseSchema('Page1Test')
const page1test1 = baseSchema('Page1Test1')
const page404 = baseSchema('404') 

const router = {
  '/dash': dashSchema,
  '/page': staticSchema,
  '/page/:id': dynamicSchema,
  '/page/:id/test': dynamicSchema,
  '/page/:id/test/:id2': dynamicSchema,
}

export const pageResolvers = {}

export async function matchRoute(url: string) {
  try {
    const routerKeys = Object.keys(router);

    for (const route of routerKeys) {
      // Transforma /page/:id/test/:id2 em ^/page/[^/]+/test/[^/]+$
      const pattern = route.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(url)) {
        return {
          route,
          schema: router[route]
        };
      }
    }
    return page404;
  } catch (error) {
    return baseSchema('Error matching route: ' + error.message);
  }
  
}