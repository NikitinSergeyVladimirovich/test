import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { v4 as uuidv4 } from 'uuid';
import { setCookie } from 'h3';

export default defineNuxtRouteMiddleware((to, from) => {
  const nuxtApp = useNuxtApp();

  const cookies = useCookie('uuid');

  if (!cookies.value && nuxtApp.ssrContext?.event) {
    const newUUID = uuidv4();
    setCookie(nuxtApp.ssrContext?.event, 'uuid', newUUID, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
  }
});

