import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CanisterInfo {
	id: string;
	created: bigint;
	name: string;
	parent_name: string;
}
export interface FileScalingManager {
	get_canister_records: ActorMethod<[], Array<CanisterInfo>>;
	get_file_storage_canister_id: ActorMethod<[], string>;
	init: ActorMethod<[], string>;
	version: ActorMethod<[], bigint>;
}
export interface _SERVICE extends FileScalingManager {}
