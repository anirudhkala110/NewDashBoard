// import React from 'react'

import { Grid } from "@mui/material"
import OrdersStatus from "components/sections/dashboard/orders-status"

const Users = () => {
    return (
        <div>
            <Grid item xs={12}>
                <OrdersStatus />
            </Grid>
        </div>
    )
}

export default Users