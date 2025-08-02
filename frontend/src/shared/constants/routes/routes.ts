export const ROUTES = {
	LOGIN: "login",
	SIGN_UP: "signup",
	LEADS: "leads",
} as const;

export const getLoginPageRoute = () => `/${ROUTES.LOGIN}`;
export const getSignUpPageRoute = () => `/${ROUTES.SIGN_UP}`;
export const getLeadsPageRoute = () => `/${ROUTES.LEADS}`;
export const getMainPageRoute = () => "/";
