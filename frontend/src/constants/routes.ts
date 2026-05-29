export const ROUTES = {
    HOME: "/",
    ROOT: "/",

    PROJECTS: {
        ROOT: "/projects",
        
        DIGIT_CLASSIFIER: "digit-classifier",
        DIGIT_CLASSIFIER_PATH: "/projects/digit-classifier",

        LOCAL_LIFT: "local-lift",
        LOCAL_LIFT_PATH: "/projects/local-lift",

        CATEGORIES: {
            ROOT: "/project-categories",
            SWE: "swe",
            SWE_PATH: "/project-categories/swe",
            AI_ML: "ai-ml",
            AI_ML_PATH: "/project-categories/ai-ml",
            CS: "cs",
            CS_PATH: "/project-categories/cs",
        },
    },
    
    AUTH: {
        ROOT: "/auth",
        SIGNUP: "signup",
        SIGNUP_PATH: "/auth/signup",
        LOGIN: "login",
        LOGIN_PATH: "/auth/login",
        LOGOUT: "logout",
        LOGOUT_PATH: "/auth/logout",
        REFRESH: "refresh",
        REFRESH_PATH: "/auth/refresh"
    }
} as const;

export const API_ROUTES = {
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  EMAIL: {
    SEND: "/email/send",
  },
  PROJECTS: {
    ROOT: "/projects"
  }
} as const;