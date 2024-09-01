import { setCache, getCache } from '../../cache';

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === 'GET') {
    const { author_id } = getQuery(event);

    if (author_id) {
      const cachedAuthorArticle = await getCache(`authorArticles${author_id}`);

      if (cachedAuthorArticle) {
        return cachedAuthorArticle;
      }

      const result = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${author_id}`).then(res => res.json());
      setCache(`authorArticles${author_id}`, result, 120);
      return result;
    }

    const cachedArticles = await getCache(`articles`);
    
    if (cachedArticles) {
      return cachedArticles;
    }
    
    const result = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
    setCache(`articles`, result, 120);
    return result;
  }

  // if (method === 'POST') {
  //   const body = await readBody(event);
  //   const userId = body.userId || uuidv4(); // Генерация UUID, если не передан
  //   const postId = body.postId;

  //   // Запись просмотренной статьи
  //   if (!viewedPosts[userId]) {
  //     viewedPosts[userId] = [];
  //   }
  //   viewedPosts[userId].push(postId);
  //   return { success: true };
  // }
});
