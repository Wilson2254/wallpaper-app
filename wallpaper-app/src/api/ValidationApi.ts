import { email, minLength, required } from '@vuelidate/validators';

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

export default rules;
