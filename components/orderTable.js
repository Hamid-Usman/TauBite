import React from 'react'

export const OrderTable = ({id, total_sum, status, onClick}) => {
    return (
        <tr
            key={id}
            onClick={onClick}
            className={`cursor-pointer border-b border-gray-300 hover:bg-gray-100 transition duration-500 ${status === "delivered" ? "bg-green-100" : "bg-yellow-100"}`}
        >
            <td className="p-2 align-top">{id}</td>
            <td className="p-2">₦{total_sum}</td>
            <td className="p-2">{status}</td>
        </tr>
    )
}
