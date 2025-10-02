import { Request, Response, NextFunction } from 'express';
import FichaMedicaService from '../services/FichaMedicaService';

class FichaMedicaController {

  // GET
  public async getFichaMedica(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ficha = await FichaMedicaService.getFichaMedica(req.user!.id);
      if (!ficha) {
        res.status(404).json({ msg: 'Ficha médica ainda não preenchida.' });
        return;
      }
      res.json(ficha);
    } catch (error) {
      next(error);
    }
  }

  // POST /cria ou atualiza
  public async criaOuAtualizaFichaMedica(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ficha = await FichaMedicaService.criaOuAtualizaFichaMedica(req.body, req.user!.id);
      res.status(200).json(ficha); 
    } catch (error) {
      next(error);
    }
  }
}

export default new FichaMedicaController();