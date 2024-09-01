<template>
    <div>
      <h1 :class="'text-center text-4xl pb-10'">Список статей автора: {{author[0].name}}</h1>
      <div :class="'grid w-full justify-center justify-items-center gap-10 m-auto <sm:grid-cols-1 <md:grid-cols-2 <lg:grid-cols-4 <xl:grid-cols-4 grid-cols-6'">
        <a :href="'/posts/' + post.id" :class="'hover:scale-150 flex w-auto h-auto shadow p-5'" v-for="post in article" :key="post.id">
            <div>
                <div :class="'flex w-full text-center justify-center items-start pb-5 text-2xl'">
                    {{ post.title }}
                </div>
                <div :class="'text-base'">
                    {{ post.body }}
                </div>
            </div>
        </a>
    </div>
    </div>
</template>
  
<script setup>
  const route = useRoute()
  const { data: author } = await useFetch(`/api/author/${route.params.id}`);
  const { data: article } = await useFetch(`/api/article?author_id=${author.value[0].id}`);
</script>