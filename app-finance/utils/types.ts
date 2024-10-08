export interface Transaction {
    id: number;
    date: string;
    description: string;
    value: number;
    category: string;
  }
  
  export enum Category {
    Alimentação = 'Alimentação',
    Moradia = 'Moradia',
    Transporte = 'Transporte',
    Saúde = 'Saúde',
    Lazer = 'Lazer',
    Outros = 'Outros',
  }