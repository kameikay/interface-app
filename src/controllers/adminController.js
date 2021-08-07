exports.adminPage = async (request, response) => {
    response.render("admin", {
        title: "Interface | Admin",
    });
};
