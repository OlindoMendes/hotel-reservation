<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-2xl font-semibold text-center text-gray-700">
        Bem-vindo {{ auth.user?.name }}
      </h1>

      <div v-if="!auth.user">
        <div class="space-y-4">
          <input
            v-model="email"
            placeholder="Email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span v-if="errors.email" class="text-red-500">{{
            errors.email
          }}</span>

          <input
            type="password"
            v-model="password"
            placeholder="Senha"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span v-if="errors.password" class="text-red-500">{{
            errors.password
          }}</span>
        </div>
        <button
          @click="validateAndLogin"
          class="w-full py-2 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/useAuthStore";
import * as yup from "yup";

interface ValidationErrors {
  email?: string;
  password?: string;
}

const auth = useAuthStore();
const email = ref<string>("");
const password = ref<string>("");
const errors = ref<ValidationErrors>({});
const router = useRouter();
const route = useRoute();

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
});

async function validateAndLogin(): Promise<void> {
  try {
    await schema.validate(
      { email: email.value, password: password.value },
      { abortEarly: false },
    );
    await login();
  } catch (validationErrors) {
    errors.value = (validationErrors as yup.ValidationError).inner.reduce(
      (acc: ValidationErrors, err) => {
        acc[err.path as keyof ValidationErrors] = err.message;
        return acc;
      },
      {},
    );
  }
}

async function login(): Promise<void> {
  await auth.login(email.value, password.value);
  router.push({ name: "hotels" });
}
</script>
