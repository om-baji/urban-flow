module.exports = {
    Query: {
        getUserById: async (_, { id }, { ds }) => {
            return ds.UserDataSource.getUserById(id);
        },
    },
    Mutation: {
        createUser: async (_, { id, name, email }, { ds }) => {
            const newUser = await ds.UserDataSource.model.create({ id, name, email });
            return newUser;
        },
    },
};