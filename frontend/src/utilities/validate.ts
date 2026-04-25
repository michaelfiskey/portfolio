export const validateEmail = (email: string) : boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validateName = (name: string): boolean => {
    return /^[a-zA-Z]+$/.test(name)
}

export const validatePassword = (password: string): boolean => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/.test(password)
}

export const emailValidationError = (email: string): string => {
    return !email.trim()
        ? "Email is required."
        : validateEmail(email)
            ? ""
            : "Enter a valid email address.";
}

export const nameValidationError = (name: string): string => {
    return !name.trim()
        ? "Name is required."
        : validateName(name)
            ? ""
            : "Enter a valid name."
}

export const messageValidationError = (message: string): string => {
    return !message.trim()
        ? "Message is required."
        : ""
}

export const passwordValidationError = (password: string): string => {
    return !password.trim()
        ? "Password is required."
        : validatePassword(password)
            ? ""
            : "Password must contain a lowercase and uppercase letter, 1 number, and 1 special character."
}