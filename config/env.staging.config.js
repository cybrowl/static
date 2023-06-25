import canisterIds from '../canister_ids.json';

export default function env() {
	return {
		isProd: true,
		DFX_NETWORK: 'staging',
		canisterIds
	};
}
