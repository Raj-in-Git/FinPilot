import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { expenseData } from "../mocks/chartData";

const chartConfig = {
  amount: {
    label: "Amount",
  },
};

export default function ExpenseChart() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>

        <CardDescription>
          Spending by category
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[320px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={expenseData}
              dataKey="amount"
              nameKey="category"
              innerRadius={70}
              strokeWidth={2}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}