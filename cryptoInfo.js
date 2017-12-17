import request from 'request'
import cheerio from 'cheerio'

const DEFAULT_URL = "https://www.coingecko.com/en/price_charts/bitcoin/usd";
const URL = "https://www.coingecko.com/en/price_charts";
const tdTagQuery = ".col-md-4.pl-5 table.table td";

const getHTMLFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if(error)
        return reject(error);
      if(response.statusCode != 200)
        return reject('Have error when get html: ' + response.statusCode);
      resolve(body);
    })
  });
}

const getCryptoInfoFromHTML = async (coin="bitcoin", fiat="usd") => {
  try {
    if (coin !== "bitcoin" || fiat !== "usd") {
      url = `${URL}/${coin}/${fiat}`
    }

    let html = await getHTMLFromUrl(url);
    let $ = await cheerio.load(html);
    let crypto_infos = []

    $(tdTagQuery).each((i, element) => {
      let text = $(element).text();
      crypto_infos[i] = text;
    });

    return crypto_infos.slice(0, 2);
  } catch (error) {
    console.error(error);
  }
}

const getCryptoInfo = async (coin="bitcoin", fiat="usd") => {
  let result = await getCryptoInfoFromHTML(coin, fiat);
  return result;
}

module.exports = { getCryptoInfo }