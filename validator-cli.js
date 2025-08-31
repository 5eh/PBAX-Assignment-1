import { ApiPromise, WsProvider } from "@polkadot/api";

const wsProvider = new WsProvider("wss://rpc.polkadot.io");
const api = await ApiPromise.create({ provider: wsProvider });

// 1. Get all activate validators
const fullValidatorList = await api.query.session.validators();
console.log("Validators:", fullValidatorList.toString());

// 2. Check reward history for one
let currentEra = await api.query.staking.currentEra();
let rewardPoints = await api.query.staking.erasRewardPoints(
  currentEra.unwrap(),
);
console.log("Rewards list", rewardPoints.toString());
console.log("Current Era", currentEra.toString());

// 3. Check that reward history within 30 days
let historyData = currentEra - 30;
console.log(historyData);

for (historyData; currentEra > historyData; historyData++) {
  let historyData = await api.query.staking.currentEra();
  let eraRewards = await api.query.staking.erasRewardPoints(
    historyData.unwrap(),
  );

  console.log("Era Number", historyData.toString(), eraRewards.toString());
}

// if (historyData + 1 > currentEra) {
//   console.log("false");
// }

// if (historyData + 1 < currentEra) {
//   console.log("true");
// }

// 4. Check that reward
