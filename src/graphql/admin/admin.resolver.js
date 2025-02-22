module.exports = {
    Query: {
        getAdminByCenterIDAndPassword: async (_, { centerID, password }, { ds }) => {
            return ds.AdminDataSource.getAdminByCenterIDAndPassword(centerID, password);
        },
    },
    Mutation: {
        createAdmin: async (_, { centerID, password, lat, lng, centerName }, { ds }) => {
            const newAdmin = await ds.AdminDataSource.createAdmin(centerID, password, lat, lng, centerName);
            return newAdmin;
        },
    },
};