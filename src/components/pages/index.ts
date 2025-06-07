import { PagesService } from "@/services/PagesService"
import { el } from "../../assets/helpers"
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
const pageService = new PagesService()

// export const router = {
//   '/': {
//     label: 'Home', 
//     schema: homeSchema
//   }, 
//   '/dash': {
//     label: 'Dashboard',
//     icon: 'fa fa-home',
//     target: 'dashboard',
//     schema: dashSchema
//   },
//   '/dash/page': { 
//     label: 'Products',
//     icon: 'fa fa-box',
//     target: 'dashboard',
//     schema: staticSchema
//   },
//   '/page': {
//     label: 'Products', 
//     schema: staticSchema
//   },
//   '/page/:id': { 
//     label: 'Product Detail', 
//     schema: dynamicSchema
//   },
//   '/page/:id/test': { 
//     label: 'Product Detail', 
//     schema: dynamicSchema
//   },
//   '/page/:id/test/:id2': { 
//     label: 'Product Detail', 
//     schema: dynamicSchema
//   },
// }

export const getMenus = async (targets:string[] = []) => {    
  return await pageService.getMenus(targets)
}
 
export const pageResolvers = {
  sectionResolver
}

export async function matchRoute(url: string) {
  try {
    const route = await pageService.matchRoute(url)
    if(!route)
      return { schema: page404 };
    return route
  } catch (error) {
    return  { schema: baseSchema(error.message) };
  }
}