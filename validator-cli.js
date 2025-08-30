import { ApiPromise, WsProvider } from "@polkadot/api";

const wsProvider = new WsProvider("wss://rpc.polkadot.io");
const api = await ApiPromise.create({ provider: wsProvider });

const validatorList = await api.query.session.validators();
console.log("Validators:", validatorList.toString());

// 1. Get all activate validators
// 2. Check reward history for one
// 3. Check that reward history within 30 days
// 4. Check that reward
