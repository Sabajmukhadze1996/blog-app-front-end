import { createRouter, createWebHistory } from "vue-router";
import RegistrationForm from "@/views/RegistrationForm.vue";
import LoginForm from "@/views/LoginForm.vue";
import PasswordRecoveryForm from "@/views/PasswordRecoveryForm.vue";
import ProfileEditForm from "@/views/ProfileEditForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "register",
      component: RegistrationForm,
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm,
    },
    {
      path: "/profile",
      name: "edit-profile",
      component: ProfileEditForm,
    },
    {
      path: "/password-recovery",
      name: "password-recovery",
      component: PasswordRecoveryForm,
    },
  ],
});

export default router;
