import { getCryptoInfo } from './cryptoInfo';
import { notify } from './notification';

const DEFAULT_TIME = 30000;
const DEFAULT_COIN = "bitcoin";
const DEFAULT_FIAT = "usd";

const getCryptoAndNotify = async (coin=DEFAULT_COIN, fiat=DEFAULT_FIAT) => {
  let content = await getCryptoInfo(coin, fiat);
  let title = coin;
  let message = `Price of ${coin}:${content[1]}${fiat} from ${content[0]}`;
  notify(title, message);
}

const notifyEvery30Seconds = async () => {
  getCryptoAndNotify();
  setInterval(() => {
    getCryptoAndNotify();
  }, DEFAULT_TIME);
}

notifyEvery30Seconds();