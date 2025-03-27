"use client"

import { Footprints, Waves } from "lucide-react"
import { Bar, BarChart, XAxis } from "recharts"

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
    { date: "2024-07-15", disposal: 450, pending: 300 },
    { date: "2024-07-16", disposal: 380, pending: 420 },
    { date: "2024-07-17", disposal: 520, pending: 120 },
    { date: "2024-07-18", disposal: 140, pending: 550 },
    { date: "2024-07-19", disposal: 600, pending: 350 },
    { date: "2024-07-20", disposal: 480, pending: 400 },
]

const chartConfig = {
    running: {
        label: "disposal",
        color: "var(--pinky)",
        icon: Footprints,
    },
    swimming: {
        label: "pending",
        color: "var(--pinky2)",
        icon: Waves,
    },
} satisfies ChartConfig

export function JudgesPerformance() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Judges Performance</CardTitle>
                <CardDescription>Disposal rates by date</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                    weekday: "short",
                                })
                            }}
                        />
                        <Bar
                            dataKey="disposal"
                            stackId="a"
                            fill="var(--pinky-2)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="pending"
                            stackId="a"
                            fill="var(--pinky)"
                            radius={[4, 4, 0, 0]}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                            cursor={false}
                            defaultIndex={1}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
