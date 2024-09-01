import prisma from '../../../../lib/prisma';

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;
  const id = getRouterParam(event, 'id');

  if (method === 'GET') {
    const userUuid = getCookie(event, 'uuid');
  
    if (!userUuid) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Пользователь не найден',
      });
    }

    if (id) { 
      const result = await prisma.ViewedArticle.findMany({
        where: { userUuid: userUuid, arcticleId: Number(id) },
      });

      return result;
    }
  }
});
