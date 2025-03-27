"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
    { browser: "pending", visitors: 35, fill: "var(--color-red-500)" },
    { browser: "process", visitors: 25, fill: "var(--color-green-500)" },
    { browser: "disposed", visitors: 40, fill: "var(--color-blue-500)" },
    { browser: "disposed", visitors: 10, fill: "var(--color-yellow-500)" },

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

export function DonutChart() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Donut with Text</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Visitors
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="space-y-2 mt-4">
                    <div className="flex items-center">
                        <div className="w-full flex items-center gap-2">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full w-[35%]" />
                            </div>
                            <span className="text-sm font-medium">35%</span>
                        </div>
                        <span className="text-sm text-muted-foreground ml-2 w-24">Pending</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-full flex items-center gap-2">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="bg-red-500 h-full w-[25%]" />
                            </div>
                            <span className="text-sm font-medium">25%</span>
                        </div>
                        <span className="text-sm text-muted-foreground ml-2 w-24">In Progress</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-full flex items-center gap-2">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[40%]" />
                            </div>
                            <span className="text-sm font-medium">40%</span>
                        </div>
                        <span className="text-sm text-muted-foreground ml-2 w-24">Disposed</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-full flex items-center gap-2">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="bg-yellow-500 h-full w-[10%]" />
                            </div>
                            <span className="text-sm font-medium">10%</span>
                        </div>
                        <span className="text-sm text-muted-foreground ml-2 w-24">Others</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
