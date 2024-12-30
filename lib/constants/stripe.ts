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
      prod: "prod_PO4s2U30VgdeFN",
    },
    monthlyPriceId: {
      dev: "price_1QVIiNCr7fYvZ7eq3SRX0YGS",
      prod: "price_1OVIiNCr7fYvZ7eq3SRX0YGS",
    },
    yearlyPriceId: {
      dev: "price_1QVIiNCr7fYvZ7eqmJT5DnJc",
      prod: "price_1OVIiNCr7fYvZ7eqmJT5DnJc",
    },
  },
  pro: {
    productId: {
      dev: "prod_RO4sb2253IZWhU",
      prod: "prod_PO4sb2253IZWhU",
    },
    monthlyPriceId: {
      dev: "price_1QVIjDCr7fYvZ7eqYZ884nMA",
      prod: "price_1OVIjDCr7fYvZ7eqYZ884nMA",
    },
    yearlyPriceId: {
      dev: "price_1QVIjDCr7fYvZ7eqcw53Mtin",
      prod: "price_1OVIjDCr7fYvZ7eqcw53Mtin",
    },
  },
  business: {
    productId: {
      dev: "prod_RO4xe0gGxzWtSb",
      prod: "prod_PO4xe0gGxzWtSb",
    },
    monthlyPriceId: {
      dev: "price_1QVInWCr7fYvZ7eqZ3FSVlFE",
      prod: "price_1OVInWCr7fYvZ7eqZ3FSVlFE",
    },
    yearlyPriceId: {
      dev: "price_1QVInWCr7fYvZ7eqZg6AMiIv",
      prod: "price_1OVInWCr7fYvZ7eqZg6AMiIv",
    },
  },
};
