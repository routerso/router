import { Button } from "@/components/ui/button";

interface PlanProps {
  name: string;
  description: string;
  monthlyPrice: number | "Contact For Pricing";
  yearlyPrice: number | "Contact For Pricing";
  monthlyStripePriceId?: string;
  yearlyStripePriceId?: string;
  stripeProductId?: string;
}

const plans: PlanProps[] = [
  {
    name: "Free",
    description: "Get started with our free plan.",
    monthlyPrice: 0,
    yearlyPrice: 0,
  },
  {
    name: "Lite",
    description: "Get started with our lite plan.",
    monthlyPrice: 7,
    yearlyPrice: 60,
    stripeProductId: "prod_RO4s2U30VgdeFN",
    monthlyStripePriceId: "price_1QVIiNCr7fYvZ7eq3SRX0YGS",
    yearlyStripePriceId: "price_1QVIiNCr7fYvZ7eqmJT5DnJc",
  },
  {
    name: "Pro",
    description: "Get started with our pro plan.",
    monthlyPrice: 20,
    yearlyPrice: 200,
    stripeProductId: "prod_RO4sb2253IZWhU",
    monthlyStripePriceId: "price_1QVIjDCr7fYvZ7eqYZ884nMA",
    yearlyStripePriceId: "price_1QVIjDCr7fYvZ7eqcw53Mtin",
  },
  {
    name: "Business",
    description: "Get started with our business plan.",
    monthlyPrice: 50,
    yearlyPrice: 500,
    stripeProductId: "prod_RO4xe0gGxzWtSb",
    monthlyStripePriceId: "price_1QVInWCr7fYvZ7eqZ3FSVlFE",
    yearlyStripePriceId: "price_1QVInWCr7fYvZ7eqZg6AMiIv",
  },
  {
    name: "Enterprise",
    description: "Get started with our enterprise plan.",
    monthlyPrice: "Contact For Pricing",
    yearlyPrice: "Contact For Pricing",
  },
];

export const PlanTiles = ({ usage }: { usage: any }) => {
  return (
    <section className="grid gap-12">
      <div className="grid grid-cols-3 gap-4">
        {plans.map((plan) => {
          return <Tile key={plan.name} plan={plan} />;
        })}
      </div>

      <p>Current Plan: {usage?.plan}</p>
    </section>
  );
};

const Tile = ({ plan }: { plan: PlanProps }) => {
  return (
    <div className="bg-background p-4 rounded-lg border grid gap-4">
      <p>{plan.name}</p>
      <p className="text-muted-foreground">{plan.description}</p>
      <p>
        {plan.monthlyPrice !== "Contact For Pricing"
          ? `$${plan.monthlyPrice}/month`
          : plan.monthlyPrice}
      </p>
      {plan.monthlyPrice !== "Contact For Pricing" ? (
        <Button>Purchase Monthly</Button>
      ) : null}

      <p>
        {plan.yearlyPrice !== "Contact For Pricing"
          ? `$${plan.yearlyPrice}/year`
          : null}
      </p>
      {plan.yearlyPrice !== "Contact For Pricing" ? (
        <Button>Purchase Yearly</Button>
      ) : null}
    </div>
  );
};
