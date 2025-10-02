import { Request, Response, NextFunction } from 'express';
import LembreteService from '../services/LembreteService';

class LembretesController {

  // GET
  public async getLembretes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lembretes = await LembreteService.getLembretes(req.user!.id);
      res.json(lembretes);
  } catch (error) {
      next(error);
    }
  }

  // POST
  public async criaLembrete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lembrete = await LembreteService.criaLembrete(req.body, req.user!.id);
      res.status(201).json(lembrete);
    } catch (error) {
        next(error);
    }
  }

  // PUT 
  public async atualizaLembrete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lembreteAtualizado = await LembreteService.atualizaLembrete(req.params.id, req.body, req.user!.id);
      if (!lembreteAtualizado) {
          res.status(404).json({ msg: 'Lembrete não encontrado ou utilizador não autorizado' });
          return;
      }
      res.json(lembreteAtualizado);
    } catch (error) {
        next(error);
    }
  }

  // DELETE
  public async deletaLembrete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sucesso = await LembreteService.deletaLembrete(req.params.id, req.user!.id);
      if (!sucesso) {
        res.status(404).json({ msg: 'Lembrete não encontrado ou utilizador não autorizado' });
        return;
      }
      res.json({ msg: 'Lembrete removido com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}

export default new LembretesController();