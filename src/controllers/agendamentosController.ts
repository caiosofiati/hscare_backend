import { Request, Response, NextFunction } from 'express';
import AgendamentoService from '../services/AgendamentoService';

class AgendamentosController {

  // Busca todos os agendamentos do usuário autenticado
  public async getAgendamentos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Delega a busca para o service, passando o ID do usuário logado
      const agendamentos = await AgendamentoService.getAgendamentos(req.user!.id);
      res.json(agendamentos);
    } catch (error) {
      next(error);
    }
  }

  // Cria um novo agendamento
  public async criaAgendamento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Passa os dados do corpo da requisição e o ID do usuário para o service
      const novoAgendamento = await AgendamentoService.criaAgendamento(req.body, req.user!.id);
      res.status(201).json(novoAgendamento);
    } catch (error) {
      next(error);
    }
  }

  // Atualiza um agendamento existente
  public async atualizaAgendamento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const agendamentoAtualizado = await AgendamentoService.atualizaAgendamento(req.params.id, req.body, req.user!.id);
      
      if (!agendamentoAtualizado) {
        res.status(404).json({ msg: 'Agendamento não encontrado ou não autorizado.' });
        return;
      }
      res.json(agendamentoAtualizado);
    } catch (error) {
      next(error);
    }
  }

  // Deleta um agendamento
  public async deletaAgendamento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sucesso = await AgendamentoService.deletaAgendamento(req.params.id, req.user!.id);
      
      if (!sucesso) {
        res.status(404).json({ msg: 'Agendamento não encontrado ou não autorizado.' });
        return;
      }
      res.json({ msg: 'Agendamento removido com sucesso.' });
    } catch (error) {
      next(error);
    }
  }
}

// Exporta uma única instância da classe para ser usada nas rotas
export default new AgendamentosController();