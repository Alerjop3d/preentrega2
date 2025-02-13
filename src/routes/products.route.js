import { Router } from 'express';
import fs from 'fs';

const router = Router();

router.get('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync("./src/products.json", 'utf8'));
    res.json(products);
});

export default router;