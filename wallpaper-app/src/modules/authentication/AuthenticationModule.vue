<script setup lang="ts">
import { ref, computed } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const email = ref('test@gamil.com');
const password = ref('123456');
const isRegistrationMode = ref(false);

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
    createUserWithEmailAndPassword(auth, email.value, password.value) // need .value because ref()
        .then((data) => {
            console.log('Successfully registered!', data);
        })
        .catch((error) => {
            console.log(error);
        });
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
                        <label
                            for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            required=""
                        />
                    </div>
                    <div>
                        <label
                            for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="*********"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
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
                        Do you already have an account??
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
