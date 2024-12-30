interface StripePlanConfig {
  productId: {
    dev: string;
    prod: string;
  };
  monthlyPriceId: {
    dev: string;
    prod: string;
  };
  yearlyPriceId: {
    dev: string;
    prod: string;
  };
}

interface StripePlansConfig {
  lite: StripePlanConfig;
  pro: StripePlanConfig;
  business: StripePlanConfig;
}

export const STRIPE_PLANS: StripePlansConfig = {
  lite: {
    productId: {
      dev: "prod_RO4s2U30VgdeFN",
      prod: "prod_RUs75BH3nWi3Ul",
    },
    monthlyPriceId: {
      dev: "price_1QVIiNCr7fYvZ7eq3SRX0YGS",
      prod: "price_1QbsNLCr7fYvZ7eqoMYV6x6i",
    },
    yearlyPriceId: {
      dev: "price_1QVIiNCr7fYvZ7eqmJT5DnJc",
      prod: "price_1QbsNLCr7fYvZ7eqUl3feFYH",
    },
  },
  pro: {
    productId: {
      dev: "prod_RO4sb2253IZWhU",
      prod: "prod_RUs7T3eo9UPxDv",
    },
    monthlyPriceId: {
      dev: "price_1QVIjDCr7fYvZ7eqYZ884nMA",
      prod: "price_1QbsNJCr7fYvZ7eqPlAHuLud",
    },
    yearlyPriceId: {
      dev: "price_1QVIjDCr7fYvZ7eqcw53Mtin",
      prod: "price_1QbsNJCr7fYvZ7eqB4M2rvjR",
    },
  },
  business: {
    productId: {
      dev: "prod_RO4xe0gGxzWtSb",
      prod: "prod_RUs7q0aCgaYhNF",
    },
    monthlyPriceId: {
      dev: "price_1QVInWCr7fYvZ7eqZ3FSVlFE",
      prod: "price_1QbsN7Cr7fYvZ7eqCCdyk03H",
    },
    yearlyPriceId: {
      dev: "price_1QVInWCr7fYvZ7eqZg6AMiIv",
      prod: "price_1QbsN7Cr7fYvZ7eqYxJo3vZd",
    },
  },
};
