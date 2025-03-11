"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
const { DateTime } = require("luxon");

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

const formatData = (data) => {
    console.log(data)
    return data.map(d => {
        return {
            time: DateTime.fromFormat(d.time, 'yyyy-MM-dd HH:mm').toFormat('HH'),
            temp: d.temp_c,
            icon: d.icon
        }

    })
}
const chartConfig = {
    temp: {
        label: "Température",
        color: "hsl(var(--chart-1))",
    }
} satisfies ChartConfig

export function LinearChart({ forecast }) {
    console.log(forecast)
    const date = DateTime.fromFormat(forecast.date, 'yyyy-MM-dd')
    return (
        <Card>
            <CardHeader>
                <CardTitle>{date.toLocaleString(DateTime.DATE_HUGE)}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={formatData(forecast.hours)}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3) + "h"}
                        />
                        <YAxis />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="temp"
                            type="natural"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-desktop)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
