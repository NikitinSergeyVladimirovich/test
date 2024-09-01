<template>
  <div :class="'flex w-full h-full justify-center'">
    <div :class="'flex w-auto h-auto shadow p-5'">
      <div>
        <div :class="'flex w-full text-center justify-center items-start pb-5 text-2xl'">
          {{ article[0].title }}
        </div>
        <div :class="'text-base'">
          {{ article[0].body }}
        </div>
        <div :class="'pt-5'">
          <a :class="'underline'" :href="`/author/${author[0].id}`">
            author: {{ author[0].name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute()
  const { data: article } = await useFetch(`/api/article/${route.params.id}`);
  const { data: author } = await useFetch(`/api/author/${article.value[0].userId}`);
  const { data: ViewedArticle } = await useFetch(`/api/article/check_article/${route.params.id}`);

  const recordViewedArticle = async () => {
    const response = await useFetch(`/api/article/${route.params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleId: Number(route.params.id) }),
    });

    if (response.status.value === 'success') {
      return;
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'Пользователь не найден',
      });
    }
  };

  if (ViewedArticle.value.length === 0) {
    await recordViewedArticle();
  } 
</script>