import { Router } from 'express';

const router = Router();

router.get('/:id',(req,res) => {
    res.status(200).send('Weather Location');
})

export default router;