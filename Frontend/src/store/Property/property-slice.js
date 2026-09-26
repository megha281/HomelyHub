//state manager
// all list properties 
//count
//serach filters,
//loading flag
//error

import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
    name :"property",
    initialState:{
        properties:[],
        totalProperties: 0,
        searchParams:{},
        error:null,
        loading : false
    },
    reducers:{
        getRequest(state){
            state.loading = true;
        },
        getProperties(state,action){
            state.properties = action.payload.data;
            state.totalProperties = action.payload.all_properties;
            state.loading=false; // req finished => hide the loader
        },
        updateSearchParams:(state,action)=>{
            const nextParams = action.payload || {};

            if (Object.keys(nextParams).length === 0) {
                state.searchParams = {};
                return;
            }

            state.searchParams = {
                ...state.searchParams,
                ...nextParams,
            };
        },

        getErrors(state,action){
            state.error = action.payload
        }

    }

})

export const propertyAction = propertySlice.actions

export default propertySlice;