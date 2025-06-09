import React from 'react'

export const OrderTable = ({id, total_sum, order_date, status, onClick}) => {
    return (
        <tr
            key={id}
            onClick={onClick}
            className={`cursor-pointer border-b text-cream border-gray-300 hover:bg-gray-100 transition duration-500 
                ${status === "Pending" ? "bg-secondary"
                    :status ===  "Delivered" ? "bg-[#6F4E37]" 
                    :status ===   "Completed" ? "bg-primary"
                    : ""}
                `}
        >
            <td className="p-2 align-top">{id}</td>
            <td className="p-2 align-top">{order_date}</td>
            <td className="p-2">₦{total_sum}</td>
            <td className="p-2">{status}</td>
        </tr>
    )
}
