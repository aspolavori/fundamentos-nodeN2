import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    if(!['income', 'outcome'].includes(type)){
      throw new Error('Tipo Inválido');
    }

    const {total} = this.transactionsRepository.getBalance();
    if(type === 'outcome' && total < value){
      throw new Error('Salso insuficiente para esta operaç]ao');
    }
    const transaction = this.transactionsRepository.create({
      title, 
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
