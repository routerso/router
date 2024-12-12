import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanProps {
  name: string;
  description: string;
  monthlyPrice: number | "Contact For Pricing";
  yearlyPrice: number | "Contact For Pricing";
  monthlyStripePriceId?: string;
  yearlyStripePriceId?: string;
  stripeProductId?: string;
  features?: string[];
}

const plans: PlanProps[] = [
  {
    name: "Lite",
    description: "Perfect for small projects and individual developers.",
    monthlyPrice: 7,
    yearlyPrice: 60,
    stripeProductId: "prod_RO4s2U30VgdeFN",
    monthlyStripePriceId: "price_1QVIiNCr7fYvZ7eq3SRX0YGS",
    yearlyStripePriceId: "price_1QVIiNCr7fYvZ7eqmJT5DnJc",
    features: [
      "1,000 form submissions",
      "Unlimited endpoints",
      "Unlimited Form Generations",
      "Unlimited Webhooks",
    ],
  },
  {
    name: "Pro",
    description: "Best for growing teams and businesses.",
    monthlyPrice: 20,
    yearlyPrice: 200,
    stripeProductId: "prod_RO4sb2253IZWhU",
    monthlyStripePriceId: "price_1QVIjDCr7fYvZ7eqYZ884nMA",
    yearlyStripePriceId: "price_1QVIjDCr7fYvZ7eqcw53Mtin",
    features: [
      "10,000 form submissions",
      "Unlimited endpoints",
      "Unlimited Form Generations",
      "Unlimited Webhooks",
    ],
  },
  {
    name: "Business",
    description: "Advanced features for larger organizations.",
    monthlyPrice: 50,
    yearlyPrice: 500,
    stripeProductId: "prod_RO4xe0gGxzWtSb",
    monthlyStripePriceId: "price_1QVInWCr7fYvZ7eqZ3FSVlFE",
    yearlyStripePriceId: "price_1QVInWCr7fYvZ7eqZg6AMiIv",
    features: [
      "50,000 form submissions",
      "Unlimited endpoints",
      "Unlimited Form Generations",
      "Unlimited Webhooks",
      "CRM Integrations",
      "Slack Support",
    ],
  },
  {
    name: "Enterprise",
    description: "Custom solutions for enterprise needs.",
    monthlyPrice: "Contact For Pricing",
    yearlyPrice: "Contact For Pricing",
    features: [
      "Unlimited form submissions",
      "Unlimited endpoints",
      "Unlimited Form Generations",
      "Unlimited Webhooks",
      "CRM Integrations",
      "Slack Support",
    ],
  },
];

export const PlanTiles = ({ usage }: { usage: any }) => {
  return (
    <section className="grid gap-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <Tile key={plan.name} plan={plan} currentPlan={usage?.plan} />
        ))}
      </div>

      <p className="text-center text-muted-foreground">
        Current Plan:{" "}
        <span className="font-medium text-foreground">{usage?.plan}</span>
      </p>
    </section>
  );
};

const Tile = ({
  plan,
  currentPlan,
}: {
  plan: PlanProps;
  currentPlan?: string;
}) => {
  const isCurrentPlan = currentPlan?.toLowerCase() === plan.name.toLowerCase();

  console.log(currentPlan);

  return (
    <div
      className={cn(
        "relative bg-background p-6 rounded-lg border flex flex-col gap-4 transition-all",
        isCurrentPlan && "border-2 border-primary bg-primary/5"
      )}
    >
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full">
          <p className="text-xs text-primary-foreground font-medium">
            Current Plan
          </p>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <p className="text-muted-foreground text-sm">{plan.description}</p>
      </div>

      <div className="space-y-4 flex-1">
        <div className="space-y-2">
          {plan.monthlyPrice !== "Contact For Pricing" ? (
            <div className="space-y-1">
              <p className="text-3xl font-bold">
                ${plan.monthlyPrice}
                <span className="text-muted-foreground text-sm font-normal">
                  /month
                </span>
              </p>
              <p className="text-muted-foreground text-sm">
                ${plan.yearlyPrice}/year
                {typeof plan.monthlyPrice === "number" &&
                  typeof plan.yearlyPrice === "number" &&
                  ` (save $${plan.monthlyPrice * 12 - plan.yearlyPrice})`}
              </p>
            </div>
          ) : (
            <p className="text-xl font-semibold">{plan.monthlyPrice}</p>
          )}
        </div>

        <div className="space-y-2">
          {plan.features?.map((feature) => (
            <p className="flex items-center gap-2 text-sm" key={feature}>
              <Check className="text-primary" size={14} /> {feature}
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-4">
        {!isCurrentPlan &&
          (plan.monthlyPrice !== "Contact For Pricing" ? (
            <>
              <Button className="w-full" variant="outline">
                Purchase Monthly
              </Button>
              <Button className="w-full" variant="secondary">
                Purchase Yearly
              </Button>
            </>
          ) : (
            <Button className="w-full">Contact Sales</Button>
          ))}
        {isCurrentPlan && (
          <Button
            variant="outline"
            className="w-full pointer-events-none cursor-default"
          >
            Your Active Plan
          </Button>
        )}
      </div>
    </div>
  );
};
