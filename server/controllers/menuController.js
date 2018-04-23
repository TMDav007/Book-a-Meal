import menu from "./../models/menu";

class menuController {

    static getAllMenu(req, res) {
        if (menu.length > 0){
            return res.status(200).json({
                result: menu,
                error: false
            });
        }
        return res.status(400).json ({
            message: 'not found',
            error: true
        });
    }
}

export default menuController;