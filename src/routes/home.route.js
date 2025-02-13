import { Router } from 'express';

const router = Router();

// Ruta para renderizar la plantilla home.handlebars
router.get('/', (req, res) => {
    res.render('home'); 
});

export default router;