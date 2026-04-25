import FormBase from "../primatives/FormBase";
import FormField from "../primatives/FormField";
import FormInput from "../primatives/FormInput";
import FormSubmitButton from "../primatives/FormSubmitButton"
import { useState } from "react";
import type { TextFieldState } from "../formtypes";
import { emailValidationError, passwordValidationError } from "../../../utilities/validate";
import { Link } from 'react-router'

const SignupForm = () => {
    const [email, setEmail] = useState<TextFieldState>({value: "", isTouched: false});
    const emailError = emailValidationError(email.value)

    const [password, setPassword] = useState<TextFieldState>({value: "", isTouched: false});
    const passwordError = passwordValidationError(password.value);

    const isFormValid = !passwordError && !emailError

    const handleOnSubmit = () => {
        return
    }

    return (
        <FormBase className="w-md! shadow-xl rounded-2xl border border-warm-700 bg-warm-950 p-6 md:p-12" onSubmit={handleOnSubmit}>
            <div className="text-center pb-4">
                <h1 className="text-warm-500!">Signup</h1> 
                <h2 className="text-warm-50!">Sign up to get started!</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <FormField label="Email" required={true} error={email.isTouched ? emailError : ""}>
                    <FormInput
						placeholder="johndoe@example.com"
						value={email.value}
						onChange={(e) => setEmail({ ...email, value: e.target.value.slice(0, 75) })}
						onBlur={() => setEmail({ ...email, isTouched: true })}
						isInvalid={Boolean(email.isTouched && emailError)}
					/>
                </FormField>
                <FormField label="Password" required={true} error={password.isTouched ? passwordError : ""}>
                    <FormInput
                        type='password'
						placeholder="•••••••••"
						value={password.value}
						onChange={(e) => setPassword({ ...password, value: e.target.value.slice(0, 50) })}
						onBlur={() => setPassword({ ...password, isTouched: true })}
						isInvalid={Boolean(password.isTouched && passwordError)}
					/>
                </FormField>
                <p className="text-warm-50! text-center p-0!">Already have an account? <br/><Link to={{pathname: "/login"}}><u>Login here!</u></Link></p>
                <FormSubmitButton disabled={!isFormValid}>Login</FormSubmitButton>
            </div>
        </FormBase>
    )
}
export default SignupForm;