"use client"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "Civil", visitors: 42, fill: "var(--color-blue-500)" },
    { browser: "Criminal", visitors: 28, fill: "var(--color-red-500)" },
    { browser: "Family", visitors: 18, fill: "var(--color-green-500)" },
    { browser: "other", visitors: 12, fill: "var(--color-yellow-500)" },
]
const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig
export function HearingPieChartEfficiency() {
    return (
        <Card className="flex flex-col  bg-transparent shadow-none  border-none   ">
                {/* <CardHeader className="bg-transparent ">
                <CardTitle>Pie Chart</CardTitle>
                    <CardDescription>Browser usage statistics</CardDescription>

                </CardHeader> */}
            <CardContent className="flex-1  pb-0 ">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto  h-[500px] aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel/>} />
                        <Pie data={chartData} dataKey="visitors"  nameKey="browser" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            
        </Card>
    )
}
