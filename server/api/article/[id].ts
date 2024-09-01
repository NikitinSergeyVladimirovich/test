import { setCache, getCache } from '../../cache';
import prisma from '../../../lib/prisma';
import { sendRedirect } from 'h3';
import { navigateTo } from 'nuxt/app';

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;
  const id = getRouterParam(event, 'id');

  if (method === 'GET') {
    const cachedArticle = await getCache(`article${id}`);

    if (cachedArticle) {
      return cachedArticle;
    }
  
    if (id) {
      const result = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${id}`).then(res => res.json());
      setCache(`article${id}`, result, 300);
      return result;
    }
  }
  else if (method === 'POST') {
    const { articleId } = await readBody(event);
    const userUuid = getCookie(event, 'uuid');
  
    if (!userUuid) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Пользователь не найден',
      });
    }

    const ViewedArticle = await prisma.ViewedArticle.create({
      data: { userUuid: userUuid, arcticleId: Number(articleId) },
    });
    
    return ViewedArticle;
  }
});
