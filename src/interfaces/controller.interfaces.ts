export interface IStore<TRequest, TResponse> {
	store(req: TRequest, res: TResponse): Promise<void>;
}

export interface IFindOne<TRequest, TResponse> {
	findOne(req: TRequest, res: TResponse): Promise<void>;
}

export interface IFindAll<TRequest, TResponse> {
	findAll(req: TRequest, res: TResponse): Promise<void>;
}

export interface IUpdate<TRequest, TResponse> {
	update(req: TRequest, res: TResponse): Promise<void>;
}

export interface IDelete<TRequest, TResponse> {
	delete(req: TRequest, res: TResponse): Promise<void>;
}

export interface IDestroy<TRequest, TResponse> {
	destroy(req: TRequest, res: TResponse): Promise<void>;
}
