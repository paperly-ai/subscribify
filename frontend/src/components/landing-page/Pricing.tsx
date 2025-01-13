import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, MinusIcon } from "lucide-react";

interface PlanFeature {
  type: string;
  features: {
    name: string;
    free: boolean;
    startup: boolean;
    team: boolean;
    enterprise: boolean;
  }[];
}

const planFeatures: PlanFeature[] = [
  {
    type: "Financial data",
    features: [
      {
        name: "Open/High/Low/Close",
        free: true,
        startup: true,
        team: true,
        enterprise: true,
      },
      {
        name: "Price-volume difference indicator	",
        free: true,
        startup: true,
        team: true,
        enterprise: true,
      },
    ],
  },
  {
    type: "On-chain data",
    features: [
      {
        name: "Network growth",
        free: true,
        startup: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Average token age consumed",
        free: true,
        startup: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Exchange flow",
        free: false,
        startup: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Total ERC20 exchange funds flow",
        free: false,
        startup: false,
        team: true,
        enterprise: true,
      },
    ],
  },
  {
    type: "Social data",
    features: [
      {
        name: "Dev activity",
        free: false,
        startup: true,
        team: false,
        enterprise: true,
      },
      {
        name: "Topic search",
        free: true,
        startup: true,
        team: true,
        enterprise: true,
      },
      {
        name: "Relative social dominance",
        free: true,
        startup: true,
        team: false,
        enterprise: true,
      },
    ],
  },
];

export default function PricingSection() {
  return (
    <>
      {/* Pricing */}
      <div id="pricing" className="container py-24 lg:py-32">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Pricing
          </h2>
          <p className="mt-1 text-muted-foreground">
            Whatever your status, our offers evolve according to your needs.
          </p>
        </div>
        {/* End Title */}
        {/* Switch */}
        {/* End Switch */}
        {/* Grid */}
        <div className="mt-12 flex md:flex-row flex-col justify-center gap-5 items-center">
          {/* Card */}
          <Card className="min-w-80 ">
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Free</CardTitle>
              <span className="font-bold text-5xl">Free</span>
            </CardHeader>
            <CardDescription className="text-center">
              Forever free
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">1 user</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Plan features</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Product support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={"outline"}>
                Sign up
              </Button>
            </CardFooter>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card className="min-w-80 ">
            <CardHeader className="text-center pb-2">
              <Badge className="uppercase w-max self-center mb-3">
                Most popular
              </Badge>
              <CardTitle className="!mb-7">Startup</CardTitle>
              <span className="font-bold text-5xl">£39</span>
            </CardHeader>
            <CardDescription className="text-center w-11/12 mx-auto">
              All the basics for starting a new business
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">2 user</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Plan features</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Product support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign up</Button>
            </CardFooter>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card className="min-w-80 ">
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Team</CardTitle>
              <span className="font-bold text-5xl">£89</span>
            </CardHeader>
            <CardDescription className="text-center  w-11/12 mx-auto">
              Everything you need for a growing business
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">5 user</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Plan features</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Product support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={"outline"}>
                Sign up
              </Button>
            </CardFooter>
          </Card>
          {/* End Card */}
        </div>
        {/* End Grid */}
        {/* Comparison table */}
        <div className="mt-20 lg:mt-32">
          <div className="lg:text-center mb-10 lg:mb-20">
            <h3 className="text-2xl font-semibold dark:text-white">
              Compare plans
            </h3>
          </div>
          {/* xs to lg */}
          <Table className="hidden lg:table">
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted">
                <TableHead className="w-3/12 text-primary">Plans</TableHead>
                <TableHead className="w-2/12 text-primary text-lg font-medium text-center">
                  Free
                </TableHead>
                <TableHead className="w-2/12 text-primary text-lg font-medium text-center">
                  Startup
                </TableHead>
                <TableHead className="w-2/12 text-primary text-lg font-medium text-center">
                  Team
                </TableHead>
                <TableHead className="w-2/12 text-primary text-lg font-medium text-center">
                  Enterprise
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planFeatures.map((featureType) => (
                <>
                  <TableRow className="bg-muted/50" key={featureType.type}>
                    <TableCell colSpan={5} className="font-bold">
                      {featureType.type}
                    </TableCell>
                  </TableRow>
                  {featureType.features.map((feature) => (
                    <TableRow
                      key={feature.name}
                      className="text-muted-foreground"
                    >
                      <TableCell>{feature.name}</TableCell>
                      <TableCell>
                        <div className="mx-auto w-min">
                          {feature.free ? (
                            <CheckIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="mx-auto w-min">
                          {feature.startup ? (
                            <CheckIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="mx-auto w-min">
                          {feature.team ? (
                            <CheckIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="mx-auto w-min">
                          {feature.enterprise ? (
                            <CheckIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>

          <div className="space-y-24 lg:hidden">
            <section>
              <div className="mb-4">
                <h4 className="text-xl font-medium">Free</h4>
              </div>
              <Table>
                {planFeatures.map((featureType) => (
                  <>
                    <TableRow
                      key={featureType.type}
                      className="bg-muted hover:bg-muted"
                    >
                      <TableCell
                        colSpan={2}
                        className="w-10/12 text-primary font-bold"
                      >
                        {featureType.type}
                      </TableCell>
                    </TableRow>
                    {featureType.features.map((feature) => (
                      <TableRow
                        className="text-muted-foreground"
                        key={feature.name}
                      >
                        <TableCell className="w-11/12">
                          {feature.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {feature.enterprise ? (
                            <CheckIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </Table>
            </section>
            <section>
              <div className="mb-4">
                <h4 className="text-xl font-medium">Startup</h4>
              </div>
              <Table>
                {planFeatures.map((featureType) => (
                  <>
                    <TableRow
                      key={featureType.type}
                      className="bg-muted hover:bg-muted"
                    >
                      <TableCell
                        colSpan={2}
                        className="w-10/12 text-primary font-bold"
                      >
                        {featureType.type}
                      </TableCell>
                    </TableRow>
                    {featureType.features.map((feature) => (
                      <TableRow
                        className="text-muted-foreground"
                        key={feature.name}
                      >
                        <TableCell className="w-11/12">
                          {feature.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {feature.startup ? (
                            <CheckIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </Table>
            </section>
            <section>
              <div className="mb-4">
                <h4 className="text-xl font-medium">Team</h4>
              </div>
              <Table>
                {planFeatures.map((featureType) => (
                  <>
                    <TableRow
                      key={featureType.type}
                      className="bg-muted hover:bg-muted"
                    >
                      <TableCell
                        colSpan={2}
                        className="w-10/12 text-primary font-bold"
                      >
                        {featureType.type}
                      </TableCell>
                    </TableRow>
                    {featureType.features.map((feature) => (
                      <TableRow
                        className="text-muted-foreground"
                        key={feature.name}
                      >
                        <TableCell className="w-11/12">
                          {feature.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {feature.team ? (
                            <CheckIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </Table>
            </section>
            <section>
              <div className="mb-4">
                <h4 className="text-xl font-medium">Enterprise</h4>
              </div>
              <Table>
                {planFeatures.map((featureType) => (
                  <>
                    <TableRow
                      key={featureType.type}
                      className="bg-muted hover:bg-muted"
                    >
                      <TableCell
                        colSpan={2}
                        className="w-10/12 text-primary font-bold"
                      >
                        {featureType.type}
                      </TableCell>
                    </TableRow>
                    {featureType.features.map((feature) => (
                      <TableRow
                        className="text-muted-foreground"
                        key={feature.name}
                      >
                        <TableCell className="w-11/12">
                          {feature.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {feature.enterprise ? (
                            <CheckIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </Table>
            </section>
          </div>
          {/* End xs to lg */}
        </div>
        {/* End Comparison table */}
      </div>
      {/* End Pricing */}
    </>
  );
}
