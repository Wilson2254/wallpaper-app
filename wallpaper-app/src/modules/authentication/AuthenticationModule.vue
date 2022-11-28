<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

const vuelidateState = reactive({
    authEmail: '',
    password: '',
});

const isRegistrationMode = ref(false);

const rules = {
    authEmail: {
        required,
        email,
    },
    password: {
        required,
        minLength: minLength(6),
    },
};

const $v = useVuelidate(rules, vuelidateState);

const authBtnName = computed(() =>
    isRegistrationMode.value ? 'Sign up' : 'Sign in'
);

const changeMode = (mode: String): void => {
    if (mode === 'login') {
        isRegistrationMode.value = false;
    }
    if (mode === 'registration') {
        isRegistrationMode.value = true;
    }
};

const loginAccount = (event): void => {
    const auth = getAuth();
    event.preventDefault();
    if (
        isRegistrationMode.value &&
        !$v.value.authEmail.$error &&
        !$v.value.password.$error
    ) {
        createUserWithEmailAndPassword(
            auth,
            vuelidateState.authEmail,
            vuelidateState.password
        )
            .then((data) => {
                console.log('Successfully registered!', data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
</script>

<template>
    <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
        <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                    class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                >
                    Sign in to your account
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <span
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </span>
                        <input
                            v-model="$v.authEmail.$model"
                            name="email"
                            class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            :class="{
                                'dark:border-green-700':
                                    !$v.authEmail.$error && $v.authEmail.$dirty,
                                'dark:border-red-700': $v.authEmail.$error,
                            }"
                        />
                    </div>
                    <div>
                        <span
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Password
                        </span>
                        <input
                            v-model="$v.password.$model"
                            type="password"
                            placeholder="*********"
                            class="border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            :class="{
                                'dark:border-green-700':
                                    !$v.password.$error && $v.password.$dirty,
                                'dark:border-red-700': $v.password.$error,
                            }"
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        @click="loginAccount"
                    >
                        {{ authBtnName }}
                    </button>
                    <p
                        v-if="isRegistrationMode"
                        class="text-sm font-light text-gray-500 dark:text-gray-400"
                    >
                        Do you already have an account?
                        <button
                            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            @click="changeMode('login')"
                        >
                            Sign in
                        </button>
                    </p>
                    <p
                        v-if="!isRegistrationMode"
                        class="text-sm font-light text-gray-500 dark:text-gray-400"
                    >
                        Don’t have an account yet?
                        <button
                            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            @click="changeMode('registration')"
                        >
                            Sign up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>
