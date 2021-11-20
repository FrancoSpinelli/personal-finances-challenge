let db = require('../database/models');

let mainController = {
    //USERS
    users: async(req,res) => {
        try{
            let users = await db.Users.findAll();
            return res.status(200).json({
                status: 200,
                length: users.length,
                data: users,
            });
        } catch(err){
            console.error(err);
        };
    },
    userByPk: async (req, res) => {
        try{
            let user = await db.Users.findByPk(req.params.id);
            return res.status(200).json({
                status: 200,
                data: user,
            });
        }catch (err){
            console.error(err)
        }
    },
    //MOVEMENTS
    movementsByUser: async(req, res) => {
        let categories = await db.Categories.findAll();
        let movements = await db.Movements.findAll({
            where: {user_id: req.params.id },
            order: [['date', 'desc']]
        });

        return res.status(200).json({
            status: 200,
            length: movements.length,
            data: movements.map(movement => { 
                return {
                    ...movement.dataValues,
                    category: categories.filter(category => category.id === movement.category_id)[0],
                    
                }
            }) 
        });
        
    },
    //CATEGORIES
    categories: async(req,res) => {
        try{
            let categories = await db.Categories.findAll();
            return res.status(200).json({
                status: 200,
                length: categories.length,
                data: categories,
            });
        } catch(err){
            console.error(err);
        };
    },
};

module.exports = mainController;

