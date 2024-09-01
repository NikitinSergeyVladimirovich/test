<template>
    <h1 :class="'text-center text-4xl pb-10'">Список авторов</h1>

    <div :class="'grid w-full justify-center justify-items-center gap-10 m-auto <sm:grid-cols-1 <md:grid-cols-2 <lg:grid-cols-4 <xl:grid-cols-4 grid-cols-6'">
        <a :href="'/author/' + author.id" :class="'hover:scale-150 flex w-auto h-auto shadow p-5 w-full'" v-for="author in authors" :key="author.id">
            <div>
                <div :class="'flex w-full text-center justify-center items-start pb-5 text-2xl'">
                    {{ author.name }}
                </div>
                <div :class="'text-base'">
                    {{ author.username }}
                </div>
                <div :class="'text-base'">
                    {{ author.phone }}
                </div>
                <div :class="'text-base'">
                    {{ author.email }}
                </div>
                <div :class="'text-base'">
                    {{ author.website }}
                </div>
            </div>
        </a>
    </div>
</template>

<script setup lang="ts">
    const { data: authors } = await useFetch('/api/author');
</script>
