import React from 'react'
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

interface PortflioGraphProps {
    data: Array<any>
}
const PortfolioGraph = ({data}:PortflioGraphProps) => {
    return (
            <div className='p-2 w-full lg:w-[350px] h-[200px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="name" tickLine={false} tick={{ fontSize: 0 }} />
                        <YAxis dataKey="uv" tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#FF0000" fill="#FF000060" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
    )
}

export default PortfolioGraph