"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS1 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B'];

export const StatPie = ({heading, data}) => {
    const data01 = [
        { name: 'Item A', value: 400 },
        { name: 'Item B', value: 300 },
        { name: 'Item C', value: 300 },
        { name: 'Item D', value: 300 },
        { name: 'Item E', value: 300 },
    ];


    return (
        <div className='w-1/2 py-5 px-3 bg-white rounded-xl'>
            <h3 className='font-bold'>{heading}</h3>
            
            <div className="p-4 w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data}
                        dataKey="total_orders"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS1[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};