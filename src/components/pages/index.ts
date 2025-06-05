import { sectionResolver } from "../sections/index"
import { dashSchema } from "./dashboard"
import { dynamicSchema } from "./dynamic"
import { homeSchema } from "./home"
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
   
const page404 = baseSchema('404') 

export const router = {
  '/': {
    label: 'Home', 
    schema: homeSchema
  },
  '/dash': {
    label: 'Dashboard',
    icon: 'fa fa-home',
    target: 'dashboard',
    schema: dashSchema
  },
  '/dash/page': { 
    label: 'Products',
    icon: 'fa fa-box',
    target: 'dashboard',
    schema: staticSchema
  },
  '/page': {
    label: 'Products', 
    schema: staticSchema
  },
  '/page/:id': { 
    label: 'Product Detail', 
    schema: dynamicSchema
  },
  '/page/:id/test': { 
    label: 'Product Detail', 
    schema: dynamicSchema
  },
  '/page/:id/test/:id2': { 
    label: 'Product Detail', 
    schema: dynamicSchema
  },
}

export const getMenus = (targets:string[] = []) => {    
  const menus = Object.keys(router).filter(
    m => targets.includes(router[m].target) 
  )
  return menus.map(m => ({ ...router[m], path:m }))
}

export const pageResolvers = {
  sectionResolver
}

export async function matchRoute(url: string) {
  try {
    const routerKeys = Object.keys(router);
    for (const route of routerKeys) {
      // Transforma /page/:id/test/:id2 em ^/page/[^/]+/test/[^/]+$
      const pattern = route.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(url)) { 
        const record = router[route]
        return {
          route,
          ...record
        };
      }
    }
    return page404;
  } catch (error) {
    return baseSchema('Error matching route: ' + error.message);
  }
  
}