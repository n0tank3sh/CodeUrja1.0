"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "Pending", desktop: 35 },
    { month: "progress", desktop: 25 },
    { month: "Scheduled", desktop: 15 },
    { month: "Disposed", desktop: 25 },
    
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--pinky)",
    },
} satisfies ChartConfig

export function RadarComponent() {
    return (
        <Card className="shadow-none bg-transparent border-none">
           
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        <Radar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            fillOpacity={0.6}
                            dot={{
                                r: 4,
                                fillOpacity: 1,
                            }}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Disposed  5.2% cases this month <TrendingUp className="h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    )
}
