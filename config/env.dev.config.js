import canisterIds from 'local-canister-ids';

export default function env() {
	return {
		isProd: false,
		DFX_NETWORK: 'local',
		canisterIds
	};
}
