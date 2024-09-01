import { setCache, getCache } from '../../cache';

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;
  const id = getRouterParam(event, 'id')
  const cachedAuthor = await getCache(`author${id}`);

  if (cachedAuthor) {
    return cachedAuthor;
  }

  if (method === 'GET') {
    const id = getRouterParam(event, 'id')
    if (id) {
      const result = await fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`).then(res => res.json());
      setCache(`author${id}`, result, 300);
      return result;
    }
  }
});
  