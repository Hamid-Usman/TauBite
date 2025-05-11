// app/api/order/route.js

import { useQuery } from "@tanstack/react-query";

export async function GET(request) {
  const orders = [
    
    {
      "order_id": "009c82b6-76fb-46b4-a090-377152f050a9",
      "status": "delivered",
      "food_items": [
          {
              "id": "c64c7899-7cc2-46bb-85ed-ac77e732c60d",
              "name": "ssdw",
              "price": 222.0,
              "quantity": 2,
              "price_at_order": 444.0
          },
          {
              "id": "c64c7899-7cc2-46bb-85ed-ac77e732c60d",
              "name": "ssdw",
              "price": 222.0,
              "quantity": 4,
              "price_at_order": 888.0
          }
      ],
      "total_sum": 1332.0
  },
  {
    "order_id": "009c82uy-76fb-46b4-a090-377152f050a9",
    "status": "delivered",
    "food_items": [
        {
            "id": "c1bc7899-7cc2-46bb-85ed-ac77e732c60d",
            "name": "ssdw",
            "price": 222.0,
            "quantity": 2,
            "price_at_order": 444.0
        },
        {
            "id": "c64c7899-7cc2-46bb-85ed-ac77e732c60d",
            "name": "ssdw",
            "price": 222.0,
            "quantity": 4,
            "price_at_order": 888.0
        }
    ],
    "total_sum": 1332.0
}
  ];

  return Response.json(orders); // correct way to return data
}
