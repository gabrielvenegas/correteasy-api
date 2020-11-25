interface Dictionary {
  title: string;
  value: any;
  message: string;
}

export class ValidationSku {
  product?: string;
  sku?: string;
  active?: boolean;
  message?: string;
  validations?: Dictionary[];
}

export class Validation extends ValidationSku {
  active: boolean;
  skus: ValidationSku[];
}
