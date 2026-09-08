"use client";

import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import Loading from "@/components/Loading";
import { toast } from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders);
    } catch (error) {
      console.error("FETCH_USER_ORDERS_ERROR:", error);
      toast.error(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-[70vh] mx-6">
      {orders.length > 0 ? (
        <div className="my-20 max-w-7xl mx-auto">
          <PageTitle
            heading="My Orders"
            text={`Showing total ${orders.length} orders`}
            linkText="Go to home"
          />

          <div className="flex flex-col gap-6 max-w-4xl">
            {orders.map((order) => (
              <OrderItem order={order} key={order.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] mx-6 flex items-center justify-center text-ink-400">
          <h1 className="text-2xl sm:text-4xl font-semibold">
            You have no orders
          </h1>
        </div>
      )}
    </div>
  );
}