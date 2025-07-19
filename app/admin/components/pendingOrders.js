export default function PendingOrder({ order_id, status }) {
    return (
        <li key={order_id} className="flex justify-between items-center gap-40">
            {order_id}
            <span className="text-primary font-bold">
                {status}
            </span>
        </li>
    )
}