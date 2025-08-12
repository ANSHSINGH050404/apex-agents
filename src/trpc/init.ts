import {initTRPC} from '@trpc/server'
import { cache } from 'react'


export const createTRPCContext=cache(async ()=>{
    
    return {userId:'user_123'}
});


const t=initTRPC.create({

});

export const createTRPCRouter=t.router;

export const createCallerFactary=t.createCallerFactory;
export const baseProducedure=t.procedure;
