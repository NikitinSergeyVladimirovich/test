import { setCache, getCache } from '../../cache';

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;
  const cachedAuthors = await getCache(`authors`);

  if (cachedAuthors) {
    return cachedAuthors;
  }

  if (method === 'GET') {
    const result = await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
    setCache(`authors`, result, 300);
    return result;
  }
});
