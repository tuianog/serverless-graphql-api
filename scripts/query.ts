import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

interface Entry {
    name: string;
    datetime: string;
    epoch: number;
    type: string
}

const API_URL = process.env.API_URL ?? ''
const API_KEY = process.env.API_KEY ?? '';

const httpInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
        'x-api-key': API_KEY, 
        'Content-Type': 'application/json',
    }
});

const mutationCreate = (payload: Entry): string => {
    const body = JSON.stringify({
        query: `mutation Mutation($input: CreateEntryInput!) { addEntry(input: $input) {id} }`,
        variables: {
            input: payload
        },
        operationName: 'Mutation',
    });
    return body;
}

const mutationUpdate = (id: string, payload: Partial<Entry>): string => {
    const body = JSON.stringify({
        query: `mutation Mutation($id: ID!, $input: UpdateEntryInput!) { updateEntry(id: $id, input: $input) {id, name} }`,
        variables: {
            id,
            input: payload
        },
        operationName: 'Mutation',
    });
    return body;
}


const mutationDelete = (id: string): string => {
    const body = JSON.stringify({
        query: `mutation Mutation($id: ID!) { deleteEntry(id: $id) {id} }`,
        variables: {
            id,
        },
        operationName: 'Mutation',
    });
    return body;
}

const queryByType = (type: string): string => {
    const body = JSON.stringify({
        query: `query Query($type: String!) { listEntriesByType(type: $type){id, name, epoch} }`,
        variables: {
            type,
        },
        operationName: 'Query',
    });
    return body;
}

const queryById = (id: string): string => {
    const body = JSON.stringify({
        query: `query Query($id: ID!) { getEntry(id: $id){id, name, epoch} }`,
        variables: {
            id,
        },
        operationName: 'Query',
    });
    return body;
}

(async() => {
    // const body = queryById('0fc1d2bf-3118-4a39-ae0c-ef8d270919af');
    //  const body = mutationDelete('6bdab5eb-8904-4a52-90b7-5967bdc74983');
    const body = queryByType('test');
    // const body = mutationUpdate('6bdab5eb-8904-4a52-90b7-5967bdc74983', {name: 'batatas'});
    // const body = mutationCreate({name: 'batatas', epoch: 1, datetime: new Date().toISOString(), type: 'type'});
    try {
        const {data: {
            data
        }}: AxiosResponse = await httpInstance.post('/graphql', body);
        console.log('response data', data);
    } catch (e) {
        const error = e as AxiosError;
        console.error('error',error.code, error.message );
    }
})()
