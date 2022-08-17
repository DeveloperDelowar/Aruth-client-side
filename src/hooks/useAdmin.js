import React, { useEffect, useState } from 'react';

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(user){
            const email = user?.email;

            fetch(`http://localhost:5000/is-admin/${email}`)
            .then(res => res.json())
            .then(data => console.log(data))
        }
    }, [user]);


    return [admin, loading];
};

export default useAdmin;