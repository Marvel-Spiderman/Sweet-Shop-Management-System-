import express from 'express';
import { getDevices, toggleDevice, addDevice, deleteDevice } from '../controllers/deviceController.js';

const router = express.Router();

router.get('/', getDevices);
router.post('/', addDevice);
router.patch('/:id/toggle', toggleDevice);
router.delete('/:id', deleteDevice);

export default router;
