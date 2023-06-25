 const idlFactory = ({ IDL }) => {
  const CanisterInfo = IDL.Record({
    'id' : IDL.Text,
    'created' : IDL.Int,
    'name' : IDL.Text,
    'parent_name' : IDL.Text,
  });
  const FileScalingManager = IDL.Service({
    'get_canister_records' : IDL.Func([], [IDL.Vec(CanisterInfo)], ['query']),
    'get_file_storage_canister_id' : IDL.Func([], [IDL.Text], []),
    'init' : IDL.Func([], [IDL.Text], []),
    'version' : IDL.Func([], [IDL.Nat], ['query']),
  });
  return FileScalingManager;
};
 const init = ({ IDL }) => { return []; };
module.exports = { idlFactory };
