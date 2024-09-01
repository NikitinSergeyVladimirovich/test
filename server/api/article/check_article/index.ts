import prisma from '../../../../lib/prisma';

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === 'GET') {
    const userUuid = getCookie(event, 'uuid');
  
    if (!userUuid) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Пользователь не найден',
      });
    }

    const result = await prisma.ViewedArticle.findMany({
    where: { userUuid: userUuid },
    });

    return result;
  }
});
