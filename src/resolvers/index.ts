export const resolvers = {
	Query: {
		isAuthenticated() {
			return !!sessionStorage.getItem("token");
		}
	}
};