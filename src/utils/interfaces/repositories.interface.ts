export interface IStore<TReturn> {
	store(data: TReturn): Promise<TReturn>;
}

export interface IFindOne<TReturn, TypeId> {
	findOne(id: TypeId): Promise<TReturn>;
}

export interface IFindAll<TReturn> {
	findAll(): Promise<TReturn[]>;
}

export interface IUpdate<TReturn, TypeId> {
	update(id: TypeId, data: TReturn): Promise<TReturn>;
}

export interface IDelete<TReturn, TypeId> {
	delete(id: TypeId): Promise<TReturn>;
}
