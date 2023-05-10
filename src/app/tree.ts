export class Tree<T> {
  raiz?: PathNode<T>;

  vazia() {
    let ret = false;

    if (this.raiz == null)
      ret = true;

    return ret;
  }

  tamanho(): number {
    return this.tamanhoNodo(this.raiz);
  }

  tamanhoNodo(no?: PathNode<T>): number {
    if (no == null)
      return 0;
    else
      return 1 + this.tamanhoNodo(no.esq) + this.tamanhoNodo(no.dir) + this.tamanhoNodo(no.cima) + this.tamanhoNodo(no.baixo);
  }

  altura(): number {
    return this.alturaNodo(this.raiz);
  }

  alturaNodo(no?: PathNode<T>): number {
    let alte, altd;

    if (no == null)
      return -1;
    else {
      alte = this.alturaNodo(no.esq);
      altd = this.alturaNodo(no.dir);

      return this.maior(alte, altd) + 1;
    }
  }

  maior(aE: number, aD: number): number {
    let ret = 0;

    if (aE > aD)
      ret = (aE + 1);
    else
      ret = (aD + 1);

    return ret;
  }
}

export class PathNode<T> {
  info: T;
  esq?: PathNode<T>;
  dir?: PathNode<T>;
  cima?: PathNode<T>;
  baixo?: PathNode<T>;
  pai?: PathNode<T>;

  constructor(inf: T) {
    this.info = inf;
  }

  toString() {
    return `${this.info}`;
  }
}
