<template>
    <h1 :class="'text-center text-4xl pb-10'">Список статей</h1>
    <div :class="'grid w-full justify-center justify-items-center gap-10 m-auto <sm:grid-cols-1 <md:grid-cols-2 <lg:grid-cols-4 <xl:grid-cols-4 grid-cols-6'">
        <a :href="'/posts/' + post.id" :class="'hover:scale-150 flex w-auto h-auto shadow p-5 w-full'" v-for="post in posts" :key="post.id">
            <div :class="'relative'">
                <div :class="'flex w-full text-center justify-center items-start pb-5 text-2xl '">
                    {{ post.title }}
                </div>
                <div :class="'text-base'">
                    {{ post.body }}
                </div>
                <div v-if="ViewedArticle.find(i => i.arcticleId === post.id)" :class="'pt-10'">
                    <div :class="'pt-2 absolute bottom-0'">Просмотренно</div>
                </div>
            </div>
        </a>
    </div>
</template>

<script setup lang="ts">

    const { data: posts } = await useFetch('/api/article');
    const { data: ViewedArticle } = await useFetch(`/api/article/check_article`);
</script>
