// =================== AdminBro =================== //
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const Portfolio = require("../models/AdminModel");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBroOptions = new AdminBro({
    resources: [
        {
            resource: Portfolio,
            options: {
                properties: {
                    description: { type: 'richtext'},
                    created_at: {
                        isVisible: { edit: false, list: true, show: true, filter: true }
                    }
                }
            }
        }
    ],

    locale: {
        translations: {
            labels: {
                Portfolio: 'Portfólio'
            }
        }
    },

    rootPath: '/admin'
})



const router = AdminBroExpress.buildRouter(adminBroOptions);

module.exports = { router, adminBroOptions };
