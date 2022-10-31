export interface IStore<TReturn> {
	store(data: TReturn): Promise<TReturn>;
}

export interface IFindOne<TypeId, TReturn> {
	findOne(id: TypeId): Promise<TReturn | null>;
}

export interface IFindAll<TReturn> {
	findAll(): Promise<TReturn[]>;
}

export interface IUpdate<TypeId, TReturn> {
	update(id: TypeId, data: TReturn): Promise<TReturn>;
}

export interface IDelete<TypeId, TReturn> {
	delete(id: TypeId): Promise<TReturn>;
}

export interface IDestroy<TypeId, TReturn> {
	destroy(id: TypeId): Promise<TReturn>;
}
