const SHOP_QUERY = `
{
  shop {
    id
    name
    email
    billingAddress {
      address1
      address2
      city
      country
    }
    contactEmail
    currencyCode
    currencyFormats {
      moneyFormat
    }
    domains {
      host
      url
    }
    myshopifyDomain
    shipsToCountries
    ianaTimezone
    unitSystem
    url
    weightUnit
  }
}`;

module.exports = { SHOP_QUERY };
