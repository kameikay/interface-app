const Portfolio = require("../models/PortfolioModel");

exports.adminPage = async (request, response) => {
    try {
        const portfolio = await Portfolio.showAll();

        response.render("admin", {
            title: "Interface | Admin",
            portfolio,
        });
    } catch (error) {
        console.log(error);
        response.render("404", {
            title: "Interface | Página não encontrada",
        });
    }
};

exports.createPost = async (request, response) => {
    response.render("adminNewPost", {
        title: "Interface | Admin",
    });
};

exports.register = async (req, res) => {
    try {
        const portfolio = new Portfolio(req.body , req.files);
        await portfolio.register();

        if (portfolio.errors.length > 0) {
            req.flash("errors", portfolio.errors);
            req.session.save(function () {
                return res.redirect("/user/create-post");
            });
            return;
        }
        
        req.flash("success", "Portfólio registrado com sucesso");
        req.session.save(function () {
            return res.redirect("/user/create-post");
        });

    } catch (error) {
        console.log(error);
        return res.render("404", {
            title: "Interface | Página não encontrada",
        });
    }
};

exports.editPage = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.render("404", {
                title: "Interface | Página não encontrada",
            });
        }

        const portfolio = await Portfolio.findById(request.params.id);

        if (!portfolio)
            return response.render("404", {
                title: "Interface | Página não encontrada",
            });

        response.render("adminEdit", {
            title: "Interface | Admin - Editar",
            portfolio,
        });
    } catch (error) {
        console.log(error);
        return response.sender("404", {
            title: "Interface | Página não encontrada",
        });
    }
};

exports.editPost = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.render("404", {
                title: "Interface | Página não encontrada",
            });
        }

        const portfolio = new Portfolio(request.body, request.files);
        await portfolio.edit(request.params.id);

        if (portfolio.errors.length > 0) {
            request.flash("errors", portfolio.errors);
            request.session.save(function () {
                return response.redirect("/user/create-post");
            });
            return;
        }
        request.flash("success", "Portfólio editado com sucesso");
        request.session.save(function () {
            return response.redirect("/user/create-post");
        });
    } catch (error) {
        console.log(error);
        return response.render("404", {
            title: "Interface | Página não encontrada",
        });
    }
};

exports.deletePost = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.render("404", {
                title: "Interface | Página não encontrada",
            });
        }

        const portfolio = await Portfolio.delete(request.params.id);

        if (!portfolio)
            return response.render("404", {
                title: "Interface | Página não encontrada",
            });

        request.flash("success", "Portfólio deletado com sucesso");

        request.session.save(function () {
            return response.redirect("/user/admin");
        });
        return;
    } catch (error) {
        console.log(error);
        return response.render("404", {
            title: "Interface | Página não encontrada",
        });
    }
};

// exports.deleteImage = async (request, response) => {
//     try {
//         if (!request.params.id) {
//             return response.render("404", {
//                 title: "Interface | Página não encontrada",
//             });
//         }

//         const portfolio = await Portfolio.delete(request.params.id);

//         if (process.env.STORAGE_TYPE === "s3") {
//             let objectsKeys = [];
    
//             for (let i in this.images) {
//                 objectsKeys.push(this.images[i].key);
//             }
    
//             const objects = objectsKeys.map((key) => ({ Key: key }));
    
//             return s3
//                 .deleteObjects({
//                     Bucket: process.env.BUCKET_NAME,
//                     Delete: {
//                         Objects: objects,
//                     },
//                 })
//                 .promise();
//         } else {
//             let objectsKeys = [];
    
//             for (let i in this.images) {
//                 objectsKeys.push(this.images[i].key);
//             }
    
//             objectsKeys.forEach((key) => {
//                 return promisify(fs.unlink)(
//                     path.resolve(__dirname, "..", "public", "uploads", key)
//                 );
//             });
//         }

//         if (!portfolio)
//             return response.render("404", {
//                 title: "Interface | Página não encontrada",
//             });

//         request.flash("success", "Portfólio deletado com sucesso");

//         request.session.save(function () {
//             return response.redirect("/user/admin");
//         });
//         return;
//     } catch (error) {
//         console.log(error);
//         return response.render("404", {
//             title: "Interface | Página não encontrada",
//         });
//     }
// }