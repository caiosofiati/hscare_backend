import { Request, Response, NextFunction } from 'express';
import ReceitaService from '../services/ReceitaService';

class ReceitasController {

  public async getReceitas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const receitas = await ReceitaService.getReceitas(req.user!.id);
      res.json(receitas);
    } catch (error) {
      next(error);
    }
  }

  public async criaReceita(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const receita = await ReceitaService.criaReceita(req.body, req.user!.id);
      res.status(201).json(receita);
    } catch (error) {
      next(error);
    }
  }

  public async atualizaReceita(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const receitaAtualizada = await ReceitaService.atualizaReceita(req.params.id, req.body, req.user!.id);
      if (!receitaAtualizada) {
        res.status(404).json({ msg: 'Receita não encontrada ou usuário não autorizado' });
        return;
      }
      res.json(receitaAtualizada);
    } catch (error) {
      next(error);
    }
  }

  public async deletaReceita(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sucesso = await ReceitaService.deletaReceita(req.params.id, req.user!.id);
      if (!sucesso) {
        res.status(404).json({ msg: 'Receita não encontrada ou usuário não autorizado' });
        return;
      }
      res.json({ msg: 'Receita removida com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}

// Exporta uma única instância da classe para ser usada nas rotas
export default new ReceitasController();