import { IResult } from './result.interface';

export interface IStore<TReturn> {
	store(body: TReturn): Promise<IResult>;
}

export interface IFindOne<TypeId> {
	findOne(id: TypeId): Promise<IResult>;
}

export interface IFindAll<IResult> {
	findAll(): Promise<IResult>;
}

export interface IUpdate<TypeId, TReturn> {
	update(id: TypeId, body: TReturn): Promise<IResult>;
}

export interface IDelete<TypeId> {
	delete(id: TypeId): Promise<IResult>;
}

export interface IDestroy<TypeId> {
	destroy(id: TypeId): Promise<IResult>;
}
