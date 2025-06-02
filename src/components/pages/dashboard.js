import { el } from "../../assets/helpers";

export const dashSchema = el('div', [
  el('h1', 'Dashboard'),
  '<br>',
  el('sl-button', 'Click Me', { variant:'primary' }), 
])