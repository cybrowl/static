import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as file_scaling_manager } from '$IDLfile_scaling_manager';
import { idlFactory as file_storage } from '$IDLfile_storage';

import { writable } from 'svelte/store';
import environment from 'environment';

const env = environment();

let isProd = false;

if (env['DFX_NETWORK'] === 'ic' || env['DFX_NETWORK'] === 'staging') {
	isProd = true;
}

export function createActor(options) {
	const canisterIds = env.canisterIds[options.actor_name];
	const canisterId = canisterIds[env['DFX_NETWORK']];

	const host = isProd ? `https://${canisterId}.icp0.io/` : `http://127.0.0.1:8080`;

	const agentOptions = { host };

	const idl_reference = {
		file_scaling_manager,
		file_storage
	};

	if (options && options.identity) {
		agentOptions.identity = options.identity;
	}

	const agent = new HttpAgent({ ...agentOptions });

	// Fetch root key for certificate validation during development
	if (!isProd) {
		agent.fetchRootKey().catch((err) => {
			console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
			console.error(err);
		});
	}

	// Creates an actor with using the candid interface and the HttpAgent
	return Actor.createActor(idl_reference[options.actor_name], {
		agent,
		canisterId
	});
}

export const actor_file_scaling_manager = writable({
	loggedIn: false,
	actor: createActor({ actor_name: 'file_scaling_manager' })
});

export const actor_file_storage = writable({
	loggedIn: false,
	actor: createActor({ actor_name: 'file_storage' })
});
