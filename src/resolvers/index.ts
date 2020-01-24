export const resolvers = {
  Query: {
    isAuthenticated(): boolean {
      return !!sessionStorage.getItem("token");
    },
  },
};
