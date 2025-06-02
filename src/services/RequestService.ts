import type { AstroGlobal } from 'astro';

export class AstroRequest {
  private astro: AstroGlobal;

  constructor(astro: AstroGlobal) {
    this.astro = astro;
  }

  /**
   * Returns the request parameters.
   * @returns Object containing the request parameters.
   */
  get params(): Record<string, string | undefined> {
    return this.astro.params;
  }

  /**
   * Returns the query string parameters from the request.
   * @returns Object containing the query string parameters.
   */
  get query(): Record<string, string> {
    return Object.fromEntries(this.astro.url.searchParams.entries());
  }

  get pathname(): string {
    return this.astro.url.pathname;
  }

  get origin(): string {
    return this.astro.url.origin;
  }

  /**
   * Returns the body of the request.
   * @returns The request body as a Promise.
   */
  async body<T = any>(): Promise<T> {
    const request = this.astro.request;
    return await request.json() as T;
  }
  /**
   * Converts a URL path to an object with action and parameters.
   * @param path URL path to be converted
   * @returns Object with action and numbered parameters
   */
  pathToObject(path: string): Record<string, string> {
    const segments = (path || '/').split('/').filter(segment => segment);
    const result: Record<string, string> = {};
    const query = this.astro.url.pathname.split('/').filter(segment => segment);

    if (segments.length > 0) { 
      for (let i = 0; i < segments.length; i++) {
        if(segments[i].includes(':'))
          result[segments[i].replace(':','')] = query[i];
        else
          result[segments[i]] = segments[i];
      }
    }

    return result;
  }

}
