import React from 'react';

import { headers } from 'next/headers';
import { auth } from '../auth';

const server_getToken = async () => {
    const jtwToken = await auth.api.getToken({
        headers: await headers(),
    })
    const token = jtwToken?.token;
    return token
};

export default server_getToken;