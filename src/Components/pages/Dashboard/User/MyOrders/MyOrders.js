import React, { useEffect, useState } from "react";
import DashboardTitle from "./../../DashboardTitle";
import MyOrderCard from "./MyOrderCard";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../../../firebase.init";
import { useQuery } from "react-query";
import Loading from "../../../../shared/Loading/Loading";

const MyOrders = () => {
  const [user, loading] = useAuthState(auth);

  const { data: myOrders, isLoading } = useQuery(["my-orders"], () =>
    fetch(`http://localhost:5000/my-orders?email=${user?.email}`, {
      headers: {
        auth: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <section>
      <DashboardTitle
        value={{ text: "My Orders", icon: "fa-solid fa-bag-shopping" }}
      />

      <div className="mt-5">
        {myOrders?.map((order) => (
          <MyOrderCard key={order?._id} order={order} />
        ))}
      </div>

    </section>
  );
};

export default MyOrders;
